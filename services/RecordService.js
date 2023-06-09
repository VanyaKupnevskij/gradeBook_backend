import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import RecordEntity from '../entities/RecordEntity.js';
import IncomeEntity from '../entities/IncomeEntity.js';
import CostEntity from '../entities/CostEntity.js';

class RecordService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (itemData) => {
    let item = new RecordEntity();
    item.projects_id = itemData.projects_id;
    item.owner_id = itemData.owner_id;
    item.date = itemData.date ?? new Date(Date.now());
    item.money_account = itemData.money_account;
    item.comment = itemData.comment ?? '';
    item.source_from = itemData.source_from;

    item.income = new IncomeEntity();
    item.income.price = itemData.income.price;

    item.costs = new CostEntity();
    item.costs.workers_id = itemData.costs.workers_id;
    item.costs.price = itemData.costs.price;
    item.costs.already_paid = itemData.costs.already_paid;

    const createdItem = await this.repository.insert(item);

    return createdItem;
  };

  update = async (itemData) => {
    let item = new RecordEntity(itemData.id);
    item.projects_id = itemData.projects_id;
    item.owner_id = itemData.owner_id;
    item.date = itemData.date ?? new Date(Date.now());
    item.money_account = itemData.money_account;
    item.comment = itemData.comment ?? '';
    item.source_from = itemData.source_from;

    item.income = new IncomeEntity();
    item.income.price = itemData.income.price;

    item.costs = new CostEntity();
    item.costs.workers_id = itemData.costs.workers_id;
    item.costs.price = itemData.costs.price;
    item.costs.already_paid = itemData.costs.already_paid;

    const updatedItem = await this.repository.update(item);

    return updatedItem;
  };

  getAll = async ({ start_date, end_date, owner_id, projects_id }) => {
    const items = await this.repository.getAll(start_date, end_date, owner_id, projects_id);

    return this.calculateBuisnesValues(items);
  };

  getById = async (id) => {
    const item = await this.repository.getById(id);

    const { margin, marginality, profitability } = this.calculateRowBuisnesValue(
      item.income,
      item.costs,
    );

    item.margin = margin;
    item.marginality = marginality;
    item.profitability = profitability;

    return item;
  };

  deleteById = async (id) => {
    const isSeccessful = await this.repository.delete(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_ENTITY_BY_ID(id));
    }
  };

  calculateBuisnesValues = (records) => {
    let resultRecords = [...records];
    const additionalInfo = {
      year: {},
      month: {},
      day: {},
    };

    for (let record of resultRecords) {
      const year = new Date(record.date).getFullYear();
      const month = new Date(record.date).getMonth() + 1;
      const day = new Date(record.date).getDate();

      additionalInfo.year[year] = {
        income: (additionalInfo.year[year]?.income || 0) + record.income,
        costs: (additionalInfo.year[year]?.costs || 0) + record.costs,
        already_paid: (additionalInfo.year[year]?.already_paid || 0) + record.already_paid,
      };

      additionalInfo.month[month] = {
        income: (additionalInfo.month[month]?.income || 0) + record.income,
        costs: (additionalInfo.month[month]?.costs || 0) + record.costs,
        already_paid: (additionalInfo.month[month]?.already_paid || 0) + record.already_paid,
      };

      additionalInfo.day[day] = {
        income: (additionalInfo.day[day]?.income || 0) + record.income,
        costs: (additionalInfo.day[day]?.costs || 0) + record.costs,
        already_paid: (additionalInfo.day[day]?.already_paid || 0) + record.already_paid,
      };

      for (const [keyYear, infoYear] of Object.entries(additionalInfo.year)) {
        const { margin, marginality, profitability } = this.calculateRowBuisnesValue(
          infoYear.income,
          infoYear.costs,
        );

        additionalInfo.year[keyYear].margin = margin;
        additionalInfo.year[keyYear].marginality = marginality;
        additionalInfo.year[keyYear].profitability = profitability;
      }
      for (const [keyMonth, infoMonth] of Object.entries(additionalInfo.month)) {
        const { margin, marginality, profitability } = this.calculateRowBuisnesValue(
          infoMonth.income,
          infoMonth.costs,
        );

        additionalInfo.month[keyMonth].margin = margin;
        additionalInfo.month[keyMonth].marginality = marginality;
        additionalInfo.month[keyMonth].profitability = profitability;
      }
      for (const [keyDay, infoDay] of Object.entries(additionalInfo.day)) {
        const { margin, marginality, profitability } = this.calculateRowBuisnesValue(
          infoDay.income,
          infoDay.costs,
        );

        additionalInfo.day[keyDay].margin = margin;
        additionalInfo.day[keyDay].marginality = marginality;
        additionalInfo.day[keyDay].profitability = profitability;
      }
    }

    return { resultRecords, additionalInfo };
  };

  calculateRowBuisnesValue = (income, costs) => {
    const margin = income - costs;
    const marginality = (margin / income) * 100;
    const profitability = (margin / income) * 100;

    return { margin, marginality, profitability };
  };
}

export default RecordService;

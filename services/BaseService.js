class BaseService {
  constructor(repository) {
    if (repository === undefined) {
      throw new Error('Repository not initialize for service');
    }

    this.repository = repository;
  }
}

export default BaseService;

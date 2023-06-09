class IAction {
  constructor() {
    this.run = async (req, res) => {
      throw new Error('Must override .run() method');
    };

    if (this.validate === undefined) {
      throw new Error('Must override .validate() method');
    }
  }
}

export default IAction;

import BaseApiService from "./BaseApiService";
import axios from "axios";


const DEFAULT_SERVICE_PATH = "https://reqres.in/api/users";

class PaginatorService extends BaseApiService {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    
  }

  getUser() {
    
    return this.getAxios().get(
      `${DEFAULT_SERVICE_PATH}`,
      this.getAuth()
    );
  }

  
}

export default new PaginatorService();

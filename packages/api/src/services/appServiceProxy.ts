import * as IEmailService from '@matchstik/models/.dist/services/IEmailService';
import * as IOrganizationService from '@matchstik/models/.dist/services/IOrganizationService';
import * as IUserService from '@matchstik/models/.dist/services/IUserService';
import EmailService from './email/email.service';
import OrganizationService from './organization/organization.service';
import UserService from './user/user.service';

export interface IAppServiceProxy {
  user: IUserService.IUserServiceAPI;
  organization: IOrganizationService.IOrganizationServiceAPI;
  email: IEmailService.IEmailServiceAPI;
}

class AppServiceProxy implements IAppServiceProxy {
  public user: IUserService.IUserServiceAPI;
  public organization: IOrganizationService.IOrganizationServiceAPI;
  public email: EmailService;

  constructor() {
    this.user = new UserService(this);
    this.organization = new OrganizationService(this);
    this.email = new EmailService();
  }
}

export default new AppServiceProxy();

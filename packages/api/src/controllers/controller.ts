import UserController from './user.controller';
import IUserAPI from 'src/models/interfaces/IUserAPI';
import OrganizationController from './organization.controller';
import IOrganizationAPI from 'src/models/interfaces/IOrganizationAPI';
import ProjectController from './project.controller';
import IProjectAPI from 'src/models/interfaces/IProjectAPI';
import EmailService from '../services/email.service';
import IEmailService from 'src/models/interfaces/IEmailService';
import SpeechService from '../services/speech.service';

export interface IController {
  user: IUserAPI;
  organization: IOrganizationAPI;
  project: IProjectAPI;
  email: IEmailService;
  speech: SpeechService;
}

class Controller implements IController {
  public user: UserController;
  public organization: OrganizationController;
  public project: ProjectController;
  public email: EmailService;
  public speech: SpeechService;

  constructor() {
    this.user = new UserController(this);
    this.organization = new OrganizationController(this);
    this.project = new ProjectController(this);
    this.email = new EmailService();
    this.speech = new SpeechService();
  }
}

export default new Controller();

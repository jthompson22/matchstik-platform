import { Document, Schema, Model, model } from 'mongoose';
import IProject from '@matchstik/models/.dist/interfaces/IProject';
import ProjectMongo from '@matchstik/models/.dist/mongo/Project.mongo';

export interface IProjectModel extends IProject, Document {
  _id: string,
}
export const ProjectSchema = new Schema(ProjectMongo);
export const Project: Model<IProjectModel> = model<IProjectModel>('Project', ProjectSchema);

export default class ProjectStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super('An error occured while processing the request.');
    }
  };

  public async create(attributes: IProject): Promise<IProject> {
    let project = new Project(attributes);
    try {
      return await project.save();
    } catch (e) {
      console.error(e);
      return Promise.reject(new ProjectStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async update(userId: string, project: IProject): Promise<IProject> {
    try {
      return await Project.findOneAndUpdate(
      { 
        userId: userId,
        _id: project._id
      },
      { 
        $set: project 
      }, 
      { 
        new: true
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(new ProjectStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async list(organizationId: string): Promise<IProject[]> {
    try {
      return await Project.find({ organizationId });
    } catch (e) {
      console.error(e);
      return Promise.reject(new ProjectStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async get(projectId: string): Promise<IProject> {
    try {
      return await Project.findById(projectId);
    } catch (e) {
      console.error(e);
      return Promise.reject(new ProjectStore.OPERATION_UNSUCCESSFUL());
    }
  }
  
  public async delete(userId: string, projectId: string): Promise<boolean> {
    let project: IProject;
    try {
      project = await Project.findOneAndUpdate(
        {
          userId: userId,
          _id: projectId
        },
        {
          $set: {
            active: false,
          }
        },
        {
          new: true
        });
    } catch (e) {
      console.error(e);
      return Promise.reject(new ProjectStore.OPERATION_UNSUCCESSFUL());
    }
    return !project.active;
  }
}

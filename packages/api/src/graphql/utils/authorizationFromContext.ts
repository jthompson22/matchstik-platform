import { IAuthorizationData } from '../../models/interfaces/common';
import IUser from '@matchstik/models/.dist/interfaces/IUser';

export default function authorizationFromContext(context): IAuthorizationData {
  const { req: { user } }: { req: { user } } = context;

  return {
    userId: user.userId,
    organizationId: user.organizationId,
  };
}

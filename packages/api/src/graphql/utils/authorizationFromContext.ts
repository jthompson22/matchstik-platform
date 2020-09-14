import { IAuthorizationData } from '@matchstik/models/.dist/interfaces/common';

export default function authorizationFromContext(context): IAuthorizationData {
  const { req: { user } }: { req: { user } } = context;

  return {
    userId: user.userId,
    organizationId: user.organizationId,
  };
}

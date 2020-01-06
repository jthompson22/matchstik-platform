interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordHash: string;
  phoneNumber: string;
  imageUrl: string;
  bio?: string;
  orgId?: string;
  stripeId?: string;
  plaidId?: string;
  createdAt: number;
  updatedAt: number;
}

interface TaxYear {
  userId?: string;
  orgId?: string;
  year: string;
  link: string;
  createdAt: number;
}

enum OrganizationTypeEnum {
  Business = 'Business',
  NonProfit = 'NonProfit',
}

enum BusinessSectorsEnum {

}

enum NonProfitSectorsEnum {

}

interface IOrganization {
  name: string;
  type: OrganizationTypeEnum;
  sector: BusinessSectorsEnum | NonProfitSectorsEnum;
  ein: string;
  plaidId?: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
  bio?: string;
  imageUrl: string;
  address?: string;
  executive?: string;
  budget?: number;
  createdAt: number;
  updatedAt?: number;
}

interface ICampaign {
  orgId: string;
  name: string;
  description: string;
  sector?: NonProfitSectorsEnum;
  imageUrl?: string;
  videoUrl?: string;
  goal: number;
  filled: number;
  active?: boolean;
  annouceAt: number;
  startsAt: number;
  endsAt: number;
  createdAt?: number;
  updatedAt?: number;
}

interface ICampaignUpdate {
  campaignId: string;
  orgId: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

interface IMatch {
  userId?: string;
  orgId?: string;
  campaignId: string;
  amount: number;
  filledAmount: number;
  chargedId?: string;
  comment?: string;
  anonymous: boolean;
  createdAt: number;
  updatedAt: number;
}

interface IDonation {
  userId?: string;
  orgId?: string;
  campaignId: string;
  amount: number;
  chargedId?: string;
  comment?: string;
  anonymous: boolean;
  createdAt: number;
  updatedAt: number;
}

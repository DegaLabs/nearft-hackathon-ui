import type { AccountView } from "near-api-js/lib/providers/provider";

export interface Message {
  premium: boolean;
  sender: string;
  text: string;
}

export type IAccount = AccountView & {
  account_id: string;
};

export interface INFTMetadata {
  tokenId: number
  image: string
  name: string
  description: string
  owner: string
  price: number
  seller: string
}

export interface IPool {
  asset_recipient: string | null
  curve_type: string
  delta: string
  fee: string
  near_balance: string
  nft_token: string
  owner: string
  pool_id: number
  pool_token_ids: []
  pool_type: number
  spot_price: string
}

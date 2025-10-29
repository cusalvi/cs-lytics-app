import { cache } from 'react';

import contentstack from '@contentstack/delivery-sdk';
// import contentstack from 'contentstack';

import Personalize from '@contentstack/personalize-edge-sdk';


const _getEntries = async (contentType: string, query: Record<string, any>, variantParam?: string | undefined) => {
  console.log("process.env.NODE_ENV and api_key", process.env.NODE_ENV, process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY, contentType);
  if (!process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY) {
    throw Error('CONTENTSTACK_API_KEY is missing');
  }

  if (!process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN) {
    throw Error('CONTENTSTACK_DELIVERY_TOKEN is missing');
  }

  if (!process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT) {
    throw Error('CONTENTSTACK_DELIVERY_TOKEN is missing');
  }

  if (!process.env.NEXT_PUBLIC_CONTENTSTACK_WEBPAGE_CONTENTTYPE_UID) {
    throw Error('CONTENTSTACK_WEBPAGE_CONTENTTYPE_UID is missing');
  }

  try {
    const stackSDK = contentstack.stack({
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
      deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_API_HOST,
    });
    const entriesCall = stackSDK
      .contentType(contentType).entry()

    let entries;
    if (variantParam) {
      console.log("variantParam should be 0_0 ----->", variantParam)
      const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(',');
      // const variantAlias = Personalize.getVariantParam();
      entries = await entriesCall.variants(variantAlias).query(query).find();
    } else {
      entries = await entriesCall.query(query).find();
    }

    return entries.entries;
  } catch (error) {
    console.error('🚀 ~ _getEntries ~ error:', error)

    throw error;
  }
};

export const getEntries = _getEntries;
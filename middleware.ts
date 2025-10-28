// middleware.ts
import {
    NextRequest,
    NextResponse,
} from 'next/server';
import Personalize from '@contentstack/personalize-edge-sdk';
  
export default async function middleware(req: NextRequest) {
  
    const projectUid = process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID as string;
  
    // set a custom edge API URL
    if (process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
        Personalize.setEdgeApiUrl(process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
    }
  
    // Initialize the SDK and pass the request as well
    const personalizeSdk = await Personalize.init(projectUid, {
      request: req,
    });

    // get the variant parameter from the SDK
    const variantParam = personalizeSdk.getVariantParam();

    const parsedUrl = new URL(req.url);

    // set the variant parameter as a query param in the URL
    parsedUrl.searchParams.set(personalizeSdk.VARIANT_QUERY_PARAM, variantParam);

    // rewrite the request with the modified URL
    const response = NextResponse.rewrite(parsedUrl);

    // add cookies to the response
    personalizeSdk.addStateToResponse(response);


    return response;
  
    // return NextResponse.next(); 
}
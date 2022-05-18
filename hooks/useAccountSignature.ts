import type NearApiSignatureInterface from '@/types/NearApiSignatureInterface';
import { useEffect, useState } from 'react';
import { useSigner } from '@/modules/near-api-react/hooks/useSigner';
import { useWallet } from '@/modules/near-api-react/hooks/useWallet';
import { useCookies } from 'react-cookie';
import { COOKIE_SIGNATURE_KEY, COOKIE_EXPIRACY_TIME } from '@/constants';

export const useAccountSignature = () => {
  const [apiSignature, setApiSignature] = useState<NearApiSignatureInterface>();
  const { signStringMessage } = useSigner();
  const [, setCookie] = useCookies([COOKIE_SIGNATURE_KEY]);
  const wallet = useWallet();

  useEffect(() => {
    const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();

    if (accountId) {
      signStringMessage(accountId).then((signature) => {
        const fullSignature = {
          signature,
          accountId,
        };

        setApiSignature(fullSignature);

        setCookie(COOKIE_SIGNATURE_KEY, JSON.stringify(fullSignature), {
          path: '/',
          maxAge: COOKIE_EXPIRACY_TIME,
          sameSite: true,
        });
      });
    }
  }, [wallet]);

  return apiSignature;
};
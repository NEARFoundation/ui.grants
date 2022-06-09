import { useState } from 'react';
import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { useKycDao } from '@/modules/kycdao-sdk-react';

function StatusActionProjectApproved({ email, country }: { email: string | undefined; country: string | undefined }) {
  const { t } = useTranslation('grant');
  const [isLoading, setIsLoading] = useState(false);

  const kycDao = useKycDao();

  const runKycModal = async () => {
    if (!country || !email) {
      return;
    }

    setIsLoading(true);

    const verificationData = {
      email,
      isEmailConfirmed: true,
      taxResidency: country,
      isLegalEntity: false,
      verificationType: 'KYC',
      termsAccepted: true,
    };

    const options = {
      personaOptions: {
        onCancel: () => {
          console.log('Canceled');
          setIsLoading(false);
        },
        onComplete: async () => {
          console.log('Completed');
          setIsLoading(false);
        },
        onError: (error: string) => {
          console.log('Error', error);
          setIsLoading(false);
        },
      },
    };

    await kycDao.registerOrLogin();
    kycDao.startVerification(verificationData, options);
  };

  const startKyc = () => {
    setIsLoading(true);
    kycDao.connectWallet('Near');

    if (kycDao.walletConnected) {
      runKycModal();
    }
  };

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.approved.message')}</Text>
      <Button color="violet" onClick={startKyc} loading={isLoading} disabled={isLoading}>
        {t('details.status-actions.approved.button')}
      </Button>
    </Paper>
  );
}

export default StatusActionProjectApproved;
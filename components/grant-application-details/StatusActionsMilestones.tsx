import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { MILESTONE_STATUS, useMilestonesStatus } from '@/hooks/useMilestonesStatus';

function StatusActionsMilestones() {
  const { t } = useTranslation('grant');

  const { currentMilestone, milestonesStatus } = useMilestonesStatus();

  if (!milestonesStatus || milestonesStatus.length === 0) {
    return null;
  }

  const { status } = milestonesStatus[currentMilestone];

  if (status === MILESTONE_STATUS.STARTED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.milestones.waiting-submit.message', { number: currentMilestone + 1 })}</Text>
        <Button color="violet">{t('details.milestones.waiting-submit.button', { number: currentMilestone + 1 })}</Button>
      </Paper>
    );
  }

  return null;
}

export default StatusActionsMilestones;
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import type SputnikContractInterface from '@/types/SputnikContractInterface';
import createProposalDescription from '@/utilities/createProposalDescription';

const createPayoutProposal = async (contract: SputnikContractInterface, grantData: GrantApplicationInterface, payoutNumber: number) => {
  const description = createProposalDescription(grantData.projectName || '', payoutNumber, grantData.projectDescription || '');

  if (contract.get_policy && contract.add_proposal) {
    const policy = await contract.get_policy();

    contract.add_proposal(
      {
        proposal: {
          description,
          kind: {
            Transfer: {
              token_id: 'usdn.tesnet',
              receiver_id: grantData.nearId,
              amount: BigInt((grantData.fundingAmount || 0) * 10 ** 18).toString(),
            },
          },
        },
      },
      '30000000000000',
      policy.proposal_bond.toString(),
    );
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createPayoutProposal };

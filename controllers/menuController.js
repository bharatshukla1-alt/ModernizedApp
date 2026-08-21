exports.handleMenuAction = (req, res) => {
  const { company, action } = req.body;

  const knownActions = {
    '1': { map: 'BNK1CCM', description: 'Create Customer' },
    '2': { map: 'BNK1DCM', description: 'Display/Delete Customer' },
    '3': { map: 'BNK1CAM', description: 'Create Account' },
    '4': { map: 'BNK1DAM', description: 'Display/Delete Account' },
    '5': { map: 'BNK1UAM', description: 'Update Account' },
    '6': { map: 'BNK1CDM', description: 'Deposit / Withdrawal Cash' },
    '7': { map: 'BNK1TFM', description: 'Account to Account Transfer' },
    '8': { map: 'BNK1B2M', description: 'B2B Transfer Batch' }
  };

  const target = knownActions[action];
  if (!target) {
    return res.status(400).json({
      company: company || 'BNK1',
      action,
      message: 'Invalid ACTION code selected from BNK1MAI menu.',
      dummy: ''
    });
  }

  res.json({
    company: company || 'BNK1',
    action,
    message: `Menu Action Routed: ${target.description}`,
    targetMap: target.map,
    dummy: ''
  });
};
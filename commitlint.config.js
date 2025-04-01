module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 100],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case', 'camel-case']],
    'scope-enum': [
      2,
      'always',
      ['frontend', 'backend', 'ui', 'shared', 'api', 'config', 'docs', 'infra', 'ci', 'deps'],
    ],
  },
};

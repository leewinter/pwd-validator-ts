# pwd-validator-ts

Simple password validator in typescript

### Getting started

```console
npm install
```

```console
npm test
```

```console
npm build
```

### Extending

Why provide rules as an array: -

- By providing individual rules for validators it can be easier to test their single responsibilities.
- It also makes it easy to pick and choose which rules to apply.
- It makes it easy for new custom rules to be added to the base ruleset.
  - As shown in the extended validator tests [extend-validator.tests.ts](./src/__tests__/extend-validator.tests.ts)

Options allow global settings to be applied to all rules and used if required. The extended rule uses an options value as an example but it would be much easier to just make specific rules with hard coded criteria if required.

# Coding conventions

## Code Style

- Code convention should follow best practices and be consistent. The project have a linter tool to check the code style to ensure consistency.
- Each file should not have excessive lines of code. If a file has too many lines, consider splitting it into multiple files. Preferably, no more than **500** lines of code per file.
- Do not use `any` type in Typescript since it defeats the purpose of using Typescript. Instead, use `unknown` type and type assertion when necessary. If you want to use `any` type for a specific reason, add a comment explaining why you need to use it.
- Each file and function should respect the Single Responsibility Principle (SRP). If a file has multiple responsibilities, consider splitting it into multiple files.

## Folder Structure
- Each page should have it own folder in the `(pages)` directory. If the component is used in multiple pages, consider creating a shared component in the `(shared/components)` directory.


## PR (Pull Request) Guidelines
- When creating a PR, make sure to provide a clear description of the changes made in the PR.
- The branch name should be descriptive and should follow the convention `feature/${ticket_number}-${feature_name}` or `bug/${ticket_number}-${bug_name}`.
- Each commit message need to show the changes made in the commit alongside with the purpose of the changes.
- Each PR will be reviewed by at least one team member before merging it to the `main` branch. We encourage you to pair review with another team member to ensure the quality of the code.
- After the PR is approved and the pipeline is green, the maintainer will merge the PR to the `main` branch and it will automatically deploy to the dev environment in CD (Continuous Deployment) pipeline.
- Add a <span style="color: white; background-color: #578CBE; padding: 4px; border-radius: 4px;">Ready for Review</span> label to the PR when you want to request a review from the maintainer.
- A <span style="color: white; background-color: #DC143C; padding: 4px; border-radius: 4px;">Require Changes</span> label will be added to the PR if there are changes requested by the reviewer. You must update the PR to resolve the requested changes before updating the label again to request a review.

## Coding Guidelines
- Use function declaration instead of arrow function assign to a variable.

## Name Convention
- Enum, Enum value should be in PascalCase.
- Type, Interface, Class should be in PascalCase.
- Function, Variable should be in camelCase.
- App Router page folder should be in kebab-case.
- File name should be in camelCase, except for React component file which should be in PascalCase.
- Asset file should be in kebab-case.
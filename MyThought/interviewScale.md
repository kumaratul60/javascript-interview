For any frontend system design interview, you should focus on the following points:

I divide them into multiple parts

Core Architecture
- Discuss the rendering pattern depending upon the nature of the application
- Componentization, break the UI into components, modules, layouts, etc
- API list, what all APIs do you need to consume
- Data modeling, how would you like to store the data in the state
- State management, state normalization depending upon whether your application is read-heavy or write-heavy

Optimization
- Improving the performance of the application through code-splitting, lazy-loading, tree-shaking, adaptive-loading, and pre-loading
- Offline mode and caching strategy, do you want to support PWA or keep the application working when offline and sync back when online
- Mobile support
- Web security, web fundamentals
- Internationalization
- Accessibility
- SEO optimization

Developer experience
- File and folder structure,
- Design patterns, code patterns
- Bundling strategy (Webpack configuration)
- CI/CD
- Lint rules (Eslint, Stylelint, pre-commit checks)
- Unit cases, E2E cases
- PR review strategy

Depending upon the level you are interviewing for and the job description, you could be asked to answer on each area.

The core architecture and the optimization are the must-answer questions.

Apart from these, there are many specific scenarios you encounter depending upon which type of application you are designing.

As we don't work on all these types of applications, it is better to learn how others have done it and learn from them.
# Frontend System Design – Interview Checklist

For any frontend system design interview, structure your answer across these key areas.
Depth depends on the role level and job description, but **Core Architecture** and **Optimization** are mandatory.

---

## 1. Core Architecture (Must-Answer)

Focus on how the system is built and why.

### Rendering Strategy

- Choose based on application needs:
  - CSR / SSR / SSG / ISR
  - Streaming or partial rendering (if applicable)
- Discuss trade-offs: performance, SEO, scalability, cost

### Component Architecture

- Break UI into:
  - Pages, layouts, modules
  - Reusable and shared components
  - Feature-based boundaries
- Clear separation of concerns (UI, logic, data)

### API Design & Integration

- List required APIs
- Data contracts and response shapes
- Error handling and retry strategy
- Pagination, filtering, sorting

### Data Modeling

- Define state shape
- Normalize data where needed
- Derived vs source state
- Client cache vs server state

### State Management

- Local vs global state
- Read-heavy vs write-heavy considerations
- Server state vs client state
- Tools (Context, Redux, Zustand, React Query, etc.)

---

## 2. Optimization (Must-Answer)

Focus on performance, scalability, and reliability.

### Performance

- Code splitting and lazy loading
- Tree shaking and dead code elimination
- Memoization and render optimization
- Adaptive loading (device/network aware)
- Preloading and prefetching

### Offline & Caching

- Browser caching strategy
- Service workers
- PWA support
- Offline-first vs online-first
- Background sync

### Mobile Support

- Responsive design
- Touch interactions
- Network constraints
- Device-specific optimizations

### Web Fundamentals & Security

- XSS, CSRF, CORS
- Secure headers
- Auth and token handling
- Input validation

### Internationalization (i18n)

- Locale handling
- Translation strategy
- Date, time, currency formats
- RTL support

### Accessibility (a11y)

- Semantic HTML
- Keyboard navigation
- ARIA roles
- Color contrast
- Screen reader support

### SEO

- Metadata strategy
- Structured data
- Crawlability
- Performance impact on rankings

---

## 3. Developer Experience (DX)

Focus on maintainability and team scalability.

### Project Structure

- File and folder conventions
- Feature-based vs layer-based structure
- Shared vs domain-specific code

### Design & Code Patterns

- Component patterns
- State patterns
- Data-fetching patterns
- Error-handling patterns

### Bundling & Tooling

- Build tooling (Webpack, Vite, etc.)
- Environment configurations
- Bundle analysis

### CI / CD

- Build and test pipelines
- Environment promotions
- Rollbacks and monitoring

### Code Quality

- Linting (ESLint, Stylelint)
- Formatting (Prettier)
- Pre-commit hooks
- Static analysis

### Testing Strategy

- Unit tests
- Integration tests
- E2E tests
- Test pyramid alignment

### PR & Review Process

- Code review guidelines
- Ownership and approvals
- Automated checks

---

## Final Notes

- Core Architecture and Optimization are non-negotiable.
- Other areas vary by role and product type.
- Real-world knowledge matters — learn from existing systems and proven architectures.
- Always explain **trade-offs**, not just choices.

.PHONY: install dev build preview lint typecheck clean

# Install dependencies
install:
	npm install

# Run development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Run linter
lint:
	npm run lint

# Type check without emitting
typecheck:
	npx tsc --noEmit

# Clean build artifacts and reinstall
clean:
	rm -rf node_modules package-lock.json dist
	npm install

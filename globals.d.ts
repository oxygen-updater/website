// https://www.typescriptlang.org/tsconfig/#noUncheckedSideEffectImports
// Recognize all SCSS files as module imports
// Fixes the TS2882 error "Cannot find module or type declarations for side-effect import of 'src/styles/_global.scss'"
declare module '*.scss' { }

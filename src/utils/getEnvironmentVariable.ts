export default (name: string): string => {
  const variable: string | undefined = process.env[name];
  if (!variable) {
    throw new Error(`Environment variable '${name}' not found`);
  }
  return variable;
};

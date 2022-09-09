import { BuildExecutorSchema } from './schema';
import { ExecutorContext } from "nx/src/config/misc-interfaces";
import { detectPackageManager } from "nx/src/utils/package-manager";
import { spawn } from "child_process";

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
    const packageManager = detectPackageManager();
    const packageManagerCmd =
    packageManager === 'pnpm'
      ? 'pnpx'
      : packageManager === 'yarn'
      ? 'yarn'
      : 'npx'

  const libRoot = context.workspace.projects[context.projectName!!].root;

    const executionCode = await new Promise((res) => {
      const args = [
          'tsc',
          '-p',
          `./${libRoot}/tsconfig.${libRoot.includes('apps') ? 'app' : 'lib'}.json`,
          '--noEmit',
          'true'
        ]

      const child = spawn(
        packageManagerCmd,
        args,
        {
          stdio: 'inherit',
        }
      )
      child.on('data', (args) => console.log(args));
      child.on('close', (code) => res(code))
    })

  return { success: executionCode === 0 }
}

import { exec } from 'node:child_process';
import { resolve } from 'node:path';
import { buildProject } from './build';

async function main(): Promise<void> {
  exec('ags quit');

  await buildProject();

  const process = exec(`ags run -d ${resolve(__dirname, '../build')}`);

  process.stderr?.on('data', (data) => {
    console.log(data.toString());
  });
}

main();

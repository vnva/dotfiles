import { build, OnLoadResult } from 'esbuild';
import { dirname, relative, resolve, basename } from 'node:path';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';
import { mkdir, writeFile, rm } from 'node:fs/promises';

export async function buildProject(): Promise<void> {
  let combinedCss = ``;

  await rm(resolve(__dirname, '../build'), { force: true }).catch(() => null);

  const transformCss = (source: string, dirname: string, path: string): Promise<OnLoadResult> => {
    const transformer = postcssModules({
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]_[local]_[hash:base64:5]',
    });
    return transformer(source, dirname, path);
  };

  const globalStylesScssPath = resolve(__dirname, 'styles/index.scss');

  const buildResult = await build({
    write: false,
    entryPoints: ['./src/app.ts'],
    outdir: './build',
    bundle: true,
    minify: false,
    format: 'esm',
    external: ['astal*', 'gi://*'],
    plugins: [
      sassPlugin({
        precompile(source, pathname, isRoot) {
          if (!isRoot) return source;
          return `@import '${relative(dirname(pathname), globalStylesScssPath)}';\n${source}`;
        },
        transform: async (...args) => {
          const result = await transformCss(...args);
          combinedCss += `${result.contents}\n\n`;
          return result;
        },
      }),
    ],
  });

  await mkdir(resolve(__dirname, '../build'), { recursive: true });

  await Promise.all(
    buildResult.outputFiles.map((file) => {
      if (file.path.endsWith('.css')) return null;
      return writeFile(file.path, file.contents);
    })
  );

  await writeFile(resolve(__dirname, '../build/styles.css'), combinedCss);
}

import { createWriteStream } from 'node:fs';
import { readdir, readFile, unlink } from 'node:fs/promises';
import * as path from 'node:path';

export async function combineCSSFiles(directory: string, outputFile: string): Promise<void> {
    // Read all files in the directory
    const files = await readdir(directory);

    // Filter out only CSS files
    const cssFiles = files.filter(file => path.extname(file).toLowerCase() === '.css');

    // Create a writable stream for the output file
    const outputStream = createWriteStream(path.join(directory, outputFile));

    // Iterate over each CSS file and append its content to the output file
    for (const file of cssFiles) {
        const filePath = path.join(directory, file);
        const fileContent = await readFile(filePath, 'utf8');
        outputStream.write(fileContent + '\n');
    }

    // Close the output stream
    outputStream.end();

    // Remove the original CSS files
    for (const file of cssFiles) {
        if (file !== outputFile) {
            await unlink(path.join(directory, file));
        }
    }

    console.log(`Combined CSS files into ${outputFile} and removed the original files.`);
}

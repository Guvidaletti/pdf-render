import { existsSync, mkdirSync } from 'fs';
import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer';
import { Environment, tempFolder } from '../config/constants';

export async function generatePDF(options: {
  html: string;
  filename: string;
  headerTemplate?: string;
  footerTemplate?: string;
}): Promise<string> {
  const { html, filename, headerTemplate, footerTemplate } = options;

  const path = `${tempFolder}${filename}`;
  existsSync(tempFolder) || mkdirSync(tempFolder);

  const opt: PuppeteerLaunchOptions = {
    headless: 'new',
    executablePath:
      Environment === 'production' ? '/usr/bin/chromium' : undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  const browser = await puppeteer.launch(opt);
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.setViewport({ width: 1080, height: 1024 });

  await page.pdf({
    format: 'A4',
    path,
    headerTemplate,
    footerTemplate,
    printBackground: true,
  });
  await browser.close();

  return path;
}

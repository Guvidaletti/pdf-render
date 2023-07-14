import createDOMPurify, { Config } from 'dompurify';
import { RequestHandler } from 'express';
import { unlinkSync } from 'fs';
import { JSDOM } from 'jsdom';
import { generatePDF } from '../services/pdf.service';

export const postPDFGenerator: RequestHandler = async (req, res) => {
  // Validations and Transformations
  const { html, headerTemplate, footerTemplate, filename } = req.body;
  if (!html) {
    return res.status(400);
  }
  const fn = filename ?? `temp-${Math.random() * 1000000}.pdf`;

  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);

  const config: Config = {
    ADD_TAGS: ['style'],
    FORCE_BODY: true,
    FORBID_TAGS: ['script'],
  };

  const path = await generatePDF({
    html: DOMPurify.sanitize(html, config).toString(),
    headerTemplate:
      headerTemplate && DOMPurify.sanitize(headerTemplate, config),
    footerTemplate:
      footerTemplate && DOMPurify.sanitize(footerTemplate, config),
    filename: fn,
  });

  res.setHeader('Content-disposition', `attachment; filename="${fn}`);
  res.setHeader('Content-type', 'application/pdf');

  return res.sendFile(path, () => {
    unlinkSync(path);
  });
};

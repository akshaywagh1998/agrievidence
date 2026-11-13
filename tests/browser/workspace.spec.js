import {test,expect} from '@playwright/test';
import fs from 'node:fs/promises';
test('no-key evidence workflow, upload, refusals and both exports',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.claim')).toHaveCount(3);
 await expect(page.locator('#source-list')).toContainText('SYNTHETIC');
 await page.getByRole('button',{name:'carbon credits',exact:true}).click();
 await expect(page.locator('#results')).toContainText('No supporting excerpt found');
 await page.getByRole('button',{name:'soil monitoring',exact:true}).click();
 await page.locator('.claim').first().getByText('Inspect original source').click();
 await expect(page.locator('.claim pre').first()).toContainText('SYNTHETIC ILLUSTRATION');
 await page.setViewportSize({width:1440,height:1100});
 await page.screenshot({path:'evidence/desktop.png',fullPage:true});
 const mdPromise=page.waitForEvent('download');await page.locator('#brief').click();const md=await mdPromise;
 expect(await fs.readFile(await md.path(),'utf8')).toContain('## Reference index');
 await page.locator('#ics').click();await expect(page.locator('#status')).toContainText('Select at least one');
 await page.locator('[data-event="1"]').check();const icsPromise=page.waitForEvent('download');await page.locator('#ics').click();const ics=await icsPromise;expect(await fs.readFile(await ics.path(),'utf8')).toContain('DTSTART;VALUE=DATE:20261210');
 await page.locator('#clear').click();
 await page.locator('#upload').setInputFiles({name:'authorized-test.txt',mimeType:'text/plain',buffer:Buffer.from('Soil monitoring deadline: 2026-12-20.\n<script>window.pwned=true</script>')});
 await page.locator('#authorized').check();await page.getByRole('button',{name:'Add to library'}).click();
 await expect(page.locator('.claim')).toHaveCount(1);await expect(page.locator('.claim')).toContainText('S1:L1');
 await page.locator('#query').fill('script');await page.getByRole('button',{name:'Find excerpts'}).click();
 await expect(page.locator('.claim blockquote')).toContainText('<script>');expect(await page.evaluate(()=>window.pwned)).toBeUndefined();
 await page.reload();await expect(page.locator('#source-list')).not.toContainText('authorized-test.txt');
});
test('mobile has no horizontal overflow and supports paste',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.locator('.claim')).toHaveCount(3);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:'evidence/mobile.png',fullPage:true});
 await page.locator('#clear').click();await page.locator('#title').fill('My authorized notes');await page.locator('#source-text').fill('Soil monitoring visit 2026-12-01.');await page.locator('#authorized').check();await page.getByRole('button',{name:'Add to library'}).click();await expect(page.locator('.claim')).toHaveCount(1);
});
test('model citation attack fails visibly; mocked valid output labeled model',async({page})=>{
 await page.goto('/');await expect(page.locator('.claim')).toHaveCount(3);await page.locator('.model summary').click();
 await page.route('http://localhost:11434/api/chat',route=>route.fulfill({json:{message:{content:JSON.stringify({citations:[{id:'S8:L88',quote:'Invented fact'}]})}}}));
 await page.locator('#model-run').click();await expect(page.locator('#status')).toContainText('output rejected');await expect(page.locator('.claim')).toHaveCount(3);
 await page.unroute('http://localhost:11434/api/chat');
 await page.route('http://localhost:11434/api/chat',route=>route.fulfill({json:{message:{content:JSON.stringify({citations:[{id:'S1:L2',quote:'The fictional watershed team recorded soil moisture at three demonstration plots.'}]})}}}));
 await page.locator('#model-run').click();await expect(page.locator('#mode')).toContainText('ACTUAL MODEL');await expect(page.locator('.claim')).toHaveCount(1);
});

const fs = require('fs');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * @param {string} question The question to ask the user
 * @returns {Promise<string>} The answer to the question
*/
async function ask(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}

async function main() {
    const pageName = await ask('Page name: ');
    const pagePath = await ask('Page path: ');
    const dashboardPage = process.env.DASH == 'true' // Is the page a dashboard page or not

    const templatePath = {
        html: `./templates/${dashboardPage ? 'dashboard/' : ''}index.html`,
        js: `./templates/${dashboardPage ? 'dashboard/' : ''}page.js`,
        css: `./templates/${dashboardPage ? 'dashboard/' : ''}page.css`
    }

    console.log(`Template HTML: ${templatePath.html}`);
    console.log(`Template JS: ${templatePath.js}`);
    console.log(`Template CSS: ${templatePath.css}`);

    const pageResources = {
        html: `./public/${dashboardPage ? 'Dashboard/' : ''}${pagePath}/index.html`,
        js: `./public/js/${dashboardPage ? 'dashboard/' : ''}${pagePath}/page.js`,
        css: `./public/css/${dashboardPage ? 'Dashboard/' : ''}${pagePath}/page.css`
    }

    console.log(`Generated path for HTML: ${pageResources.html}`);
    console.log(`Generated path for JS: ${pageResources.js}`);
    console.log(`Generated path for CSS: ${pageResources.css}`);

    const pageTemplate = fs.readFileSync(templatePath.html, 'utf-8'); // Read the template file
    const pageJS = fs.readFileSync(templatePath.js, 'utf-8'); // Read the template file
    const pageCSS = fs.readFileSync(templatePath.css, 'utf-8'); // Read the template file

    console.log('Loaded template files')

    const pageHTML = pageTemplate.replace(/{{pageName}}/g, pageName).replace(/{{jsPath}}/, pageResources.js.replace('./public', '')).replace(/{{cssPath}}/, pageResources.css.replace('./public', '')).replace(/{{htmlPath}}/, pageResources.html.replace('./public', '').replace('index.html', '')); // Replace the page name in the template
    const pageJSFile = pageJS.replace(/{{pageName}}/g, pageName).replace(/{{jsPath}}/, pageResources.js.replace('./public', '')).replace(/{{cssPath}}/, pageResources.css.replace('./public', '')).replace(/{{htmlPath}}/, pageResources.html.replace('./public', '').replace('index.html', '')); // Replace the page name in the template
    const pageCSSFile = pageCSS.replace(/{{pageName}}/g, pageName).replace(/{{jsPath}}/, pageResources.js.replace('./public', '')).replace(/{{cssPath}}/, pageResources.css.replace('./public', '')).replace(/{{htmlPath}}/, pageResources.html.replace('./public', '').replace('index.html', '')); // Replace the page name in the template

    console.log('Replaced variables in template files')

    await countdown(5, 'Creating page in...')

    fs.mkdirSync(`./public/${dashboardPage ? 'Dashboard/' : ''}${pagePath}`, { recursive: true }); // Create the page directory
    fs.appendFileSync(pageResources.html, pageHTML); // Write the page file

    fs.mkdirSync(`./public/js/${dashboardPage ? 'dashboard/' : ''}${pagePath}`, { recursive: true }); // Create the page directory
    fs.appendFileSync(pageResources.js, pageJSFile); // Write the page file

    fs.mkdirSync(`./public/css/${dashboardPage ? 'Dashboard/' : ''}${pagePath}`, { recursive: true }); // Create the page directory
    fs.appendFileSync(pageResources.css, pageCSSFile); // Write the page file

    console.clear();
    console.log(`Page ${pageName} created at ${pagePath}`);

    process.exit(0);
}

async function countdown(seconds, message) {
    return new Promise((resolve, reject) => {
        let count = seconds;
        const interval = setInterval(() => {
            console.clear();
            console.log(message);
            console.log(count);
            count--;
            if (count == 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1000);
    });
}

main();
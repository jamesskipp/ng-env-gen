fs = require('fs');

const user = process.argv[2];
const host = process.argv[3];

const writeFile = (path, data) => {
    return fs.writeFile(path, data, 'utf8', (error) => {
        if (error) {
            console.error(error);
        }
    })
}

writeFile(
    'src/environments/environment.dev.ts',
    `
export const environment = {
    url: '${user}',
    api: '${host}/api'
};
    `
);

writeFile(
    'src/environments/environment.dev-gateway.ts',
    `
export const environment = {
    url: '${user}',
    api: '${user}-gateway/api'
};
    `
);

const angularJson = require('./angular.json');
const projects = angularJson.projects;
const project = projects[angularJson.defaultProject];
const serve = project.architect.serve;

const devEnvName = `dev-${user}`;
const devGatewayEnvName = `${devEnvName}-gateway`;

serve[devEnvName] = {
    user,
    host 
};

serve[devGatewayEnvName] = {
    user,
    host 
};

writeFile(
    'angular.json',
    JSON.stringify(angularJson, null, 2)
);

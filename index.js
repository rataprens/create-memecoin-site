#!/usr/bin/env node

import { input, confirm, select } from '@inquirer/prompts';
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process'; // Importar exec para ejecutar comandos

process.stdin.setMaxListeners(20);

const git = simpleGit();
const repoUrl = 'https://github.com/rataprens/memecoin-site.git';

const questions = [
  { type: 'input', name: 'siteName', message: 'What would you like to call your site?', default: 'memecoin-site' },
  { type: 'input', name: 'folderName', message: 'What would you like to name the folder?', default: 'memecoin-site' },
  { type: 'input', name: 'coinName', message: 'What is the name of your memecoin? (e.g., DOGECOIN)', default: 'MEMECOIN' },
  { type: 'input', name: 'coinSymbol', message: 'What is the symbol for your memecoin? (e.g., $PEPE)', default: '$MEMECOIN' },
  { type: 'input', name: 'contractAddress', message: 'What is the contract address of your memecoin?' },
  { type: 'input', name: 'siteTitle', message: 'What would you like the title of the site to be?', default: 'My Memecoin' },
  { type: 'input', name: 'footerDescription', message: 'What would you like the footer description to be?', default: '© 2024 by memecoin, All rights reserved!' },
  { type: 'input', name: 'homeDescription', message: 'What would you like the home description to be?' },
  { type: 'input', name: 'aboutDescription', message: 'What would you like the about description to be?' },
  { type: 'select', name: 'selectedTheme', message: 'Select your site theme:', choices: ['deepSea', 'dark', 'light', 'sunset','matrix','solarized','pastel'], default: 'deepSea' },
  { type: 'select', name: 'selectedBlockchain', message: 'Select your blockchain:', choices: ['solana', 'ethereum'], default: 'solana' },
  { type: 'input', name: 'tokenSupply', message: 'What is the total supply of your token?', default: '420,690,000,000,001' },
  { type: 'input', name: 'taxes', message: 'What taxes will your memecoin have?', default: 'No taxes, No Bullshit' },
  { type: 'input', name: 'burntLP', message: 'What is the status of your LP tokens?', default: 'LP tokens are burnt, and contract ownership is renounced.' },
  { type: 'select', name: 'backgroundShape', message: 'Select the background shape for the site:', choices: ['circle', 'square', 'triangle', 'heart', 'wave', 'ellipse'], default: 'circle' },
  { type: 'input', name: 'disclaimer', message: 'What is your disclaimer message for the site?', default: '$memecoin has no association with any official entity.' }
];

async function createSite() {
  try {
    const answers = {};

    process.on('SIGINT', async () => {
      console.log('\nAre you sure you want to exit?');
      const shouldExit = await confirm({ message: 'Do you really want to quit the generator?', default: false });
      if (shouldExit) {
        console.log('Exiting setup...');
        process.exit(0);
      } else {
        console.log('Resuming...');
      }
    });

    // Recopilamos las respuestas del usuario
    for (let question of questions) {
      try {
        let answer;
        if (question.type === 'input') {
          answer = await input(question);
        } else if (question.type === 'confirm') {
          answer = await confirm(question);
        } else if (question.type === 'select') {
          answer = await select(question);
        }
        
        if (answer !== undefined && answer !== '') {
          answers[question.name] = answer;
        }
      } catch (err) {
        console.log('\nProcess interrupted.');
        process.exit(0);
      }
    }

    console.log('Thanks! Here is the configuration:');
    console.log(JSON.stringify(answers, null, 2));

    const proceed = await confirm({ message: 'Shall we proceed with this setup?', default: true });

    if (proceed) {
      // Paso 1: Clonar el repositorio
      console.log('Cloning site template...');
      await git.clone(repoUrl, path.join(process.cwd(), answers.folderName));

      // Paso 2: Modificar la configuración del sitio
      const siteConfigPath = path.join(answers.folderName, 'src/config/siteConfig.json');
      const siteConfig = JSON.parse(fs.readFileSync(siteConfigPath, 'utf-8'));

      Object.entries(answers).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          siteConfig[key] = value;
        }
      });

      fs.writeFileSync(siteConfigPath, JSON.stringify(siteConfig, null, 2));
      console.log(`Site created in folder: ${answers.folderName}`);

      // Paso 3: Cambiar el directorio a la carpeta donde se clonó el repositorio
      process.chdir(path.join(process.cwd(), answers.folderName));

      // Paso 4: Instalar dependencias
      console.log('Installing dependencies...');
      exec('npm install', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error during installation: ${error}`);
          return;
        }

        // Paso 5: Informar al usuario que la instalación ha terminado
        console.log('Dependencies installed successfully.');
        console.log(stdout);
        if (stderr) {
          console.error(stderr);
        }

        // Preguntar al usuario si desea iniciar el servidor
        (async () => {
          const shouldStartServer = await confirm({
            message: 'Do you want to start the development server now?',
            default: true
          });

          if (shouldStartServer) {
            // Paso 6: Iniciar el servidor de desarrollo
            console.log('Starting development server...');
            exec('npm run develop', (error, stdout, stderr) => {
              if (error) {
                console.error(`Error during server start: ${error}`);
                return;
              }

              console.log('Development server started successfully.');
              console.log(stdout);
              if (stderr) {
                console.error(stderr);
              }
            });
          } else {
            console.log('Development server not started. You can start it later by running `npm run develop`.');
          }
        })();
      });
    } else {
      console.log('Setup canceled.');
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createSite();

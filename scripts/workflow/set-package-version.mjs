#!/usr/bin/env zx

import { getPackageVersion } from './get-package-version.mjs'
import path from 'path';
import versionHelper from './version-helper.mjs';
const pkgDirs = path.resolve(__dirname, '../../packages')
const pkgNames = fs.readdirSync(pkgDirs);

const version = getPackageVersion();

if (!version) {
    console.error('Failed to get a target version');
    process.exit(1)
}

for (let name of pkgNames) {
    const jsonFilePath = path.resolve(__dirname, '../../packages/' + name + '/package.json')
    console.log('reading json path');
    const pkgJson = await fs.readJson(jsonFilePath);
    pkgJson.version = version;
    
    const tag = versionHelper.getVersionTag(versionHelper.addVersionPrefix(version));
    pkgJson.publishConfig = Object.assign(pkgJson.publishConfig, {
        tag: tag
    });    

    await fs.outputJson(
        jsonFilePath,
        pkgJson,
        {
            spaces: 2
        }
    )
}    



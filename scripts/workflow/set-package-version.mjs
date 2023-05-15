#!/usr/bin/env zx

import { getPackageVersion } from './get-package-version.mjs'
import path from 'path';
import versionHelper from './version-helper.mjs';
const pkgJson = await fs.readJson(path.resolve(__dirname, '../package.json'));

const version = getPackageVersion();

if (!version) {
    console.error('Failed to get a target version');
    process.exit(1)
}


pkgJson.version = version;

const tag = versionHelper.getVersionTag(versionHelper.addVersionPrefix(version));

pkgJson.publishConfig = {
    tag: tag
};

const jsonPath = path.join(__dirname, '../package.json');

await fs.outputJson(
    jsonPath,
    pkgJson,
    {
        spaces: 2
    }
)

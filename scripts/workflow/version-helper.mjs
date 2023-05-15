
import semver from 'semver';
const VALID_VERSION_REGEX =
    /^v(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z][0-9a-zA-Z-]*))?/;

const STABLE_VERSION_REGEX = /^v\d+\.\d+\.\d+$/;

function exec(cmd) {
    return require('child_process')
        .execSync(cmd, { stdio: 'pipe' })
        .toString()
        .trim();
}

export default {
    isValid: function (version) {
        return VALID_VERSION_REGEX.test(version);
    },
    isStable: function (version) {
        return this.isValid(version) && STABLE_VERSION_REGEX.test(version);
    },
    patch: function (version) {
        return 'v' + semver.inc(version, 'patch');
    },
    getVersionTag: function (version) {
        console.log(version);
        if (!this.isValid(version)) {
            throw new Error('Invalid version');
        }

        const [,,,,tag] = VALID_VERSION_REGEX.exec(version);

        return tag || 'latest';
    },
    isGreaterOrEqual: (newVersion, previousVersion) => {
        return semver.gte(newVersion, previousVersion);
    },
    getLatestVersionTag: async function () {
        let commitish = '';
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const tag = await $`git describe --tag --abbrev=0 --match="v*" ${commitish}`;
            if (!tag) {
                throw new Error('Could not find tag.');
            }
            console.log(`tag found ${tag}`)
            if (this.isValid(tag)) {
                return tag;
            }
            // next time search older tags than this one
            commitish = tag + '~1';
        }
    },
    removeVersionPrefix: (version = '') => {
        if (version.startsWith('v')) {
            return version.substring(1);
        }
    },
    addVersionPrefix: (version = '') => {
        return `v${version}`;
    }
}
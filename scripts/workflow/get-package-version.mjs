import versionHelper from './version-helper.mjs';



const latestVersion = await versionHelper.getLatestVersionTag();
export function getPackageVersion() {
  let newVersion = '';
  try {
    if (!process.env.TAG) {
      return;
    }
      
    const tag = process.env.TAG;
    newVersion = versionHelper.removeVersionPrefix(tag);
    console.log(newVersion, ' ', versionHelper.removeVersionPrefix(latestVersion.toString()))
    if (!versionHelper.isGreaterOrEqual(newVersion, versionHelper.removeVersionPrefix(latestVersion.toString()))) {
      throw new Error(
        `New version "${newVersion}" is not >= latest version "${latestVersion}" on this branch.`
      );
    }
    return newVersion;

  } catch (e) {
    console.error(e);
  }
}
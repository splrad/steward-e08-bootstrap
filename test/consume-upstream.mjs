import assert from 'node:assert/strict';
import {readFile,mkdtemp} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {parse} from 'yaml';
const mode=process.argv[2];
if(mode==='image'){
 const image=parse(await readFile('templates/release/e08-renovate-image.yml','utf8')).jobs.fixture.container.image;
 assert.match(image,/^ghcr\.io\/renovatebot\/renovate:\d+\.\d+\.\d+@sha256:[a-f0-9]{64}$/);
 console.log(image);
}else if(mode==='prepare-settings'){
 const text=await readFile('.github/workflows/settings-sync.yml','utf8');
 const match=/ref: ([a-f0-9]{40}) # (\d+\.\d+\.\d+)/.exec(text);assert.ok(match);
 const [_,sha,tag]=match;
 const ref='refs/tags/'+tag;
 const refs=new Map(execFileSync('git',['ls-remote','--tags','https://github.com/github-community-projects/safe-settings.git',ref,ref+'^{}'],{encoding:'utf8'}).trim().split('\n').map(line=>{const [oid,name]=line.trim().split(/\s+/);return [name,oid];}));
 assert.equal(refs.get(ref+'^{}')??refs.get(ref),sha);
 const target=await mkdtemp(join(tmpdir(),'e08-safe-settings-'));
 const git=(...args)=>execFileSync('git',['-c','core.hooksPath=','-c','credential.helper=',...args],{cwd:target,stdio:['ignore','ignore','pipe']});
 git('init');git('remote','add','origin','https://github.com/github-community-projects/safe-settings.git');git('fetch','--depth=1','origin',sha);git('checkout','--detach','FETCH_HEAD');
 console.log(target);
}else if(mode==='verify-settings'){
 const target=process.argv[3];assert.ok(target);
 const pkg=JSON.parse(await readFile(join(target,'package.json'),'utf8'));
 const lock=JSON.parse(await readFile(join(target,'package-lock.json'),'utf8'));
 const probot=JSON.parse(await readFile(join(target,'node_modules/probot/package.json'),'utf8'));
 assert.equal(lock.packages['node_modules/probot'].version,probot.version);
 assert.equal(lock.packages[''].dependencies.probot,pkg.dependencies.probot);
 const require=createRequire(join(target,'package.json'));
 const imported=await import(pathToFileURL(require.resolve('probot')).href);assert.equal(typeof imported.Probot,'function');
 console.log(JSON.stringify({consumer:'safe-settings',version:pkg.version,probot:probot.version,result:'PASS'}));
}else throw Error('UNKNOWN_CONSUMER');

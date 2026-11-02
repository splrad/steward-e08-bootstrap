import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const execute=(command,args)=>{
 const r=spawnSync(command,args,{encoding:'utf8',timeout:60000,windowsHide:true});
 if(r.error)throw r.error;
 return {status:r.status,output:(r.stdout??'')+(r.stderr??'')};
};
const tools={uv:['--version'],gh:['--version'],oras:['version'],jactionlint:['--version'],pyflakes:['--version'],python:['--version'],node:['--version'],npm:['--version'],shellcheck:['--version'],zizmor:['--version'],syft:['version'],lychee:['--version']};
const versions={};
for(const [name,args] of Object.entries(tools)){
 const r=execute('mise',['exec','--locked','--',name,...args]);
 assert.equal(r.status,0,`${name}: ${r.output}`);assert.ok(r.output.trim());versions[name]=r.output.trim();
}
const which=name=>{
 const r=execute('mise',['which',name]);assert.equal(r.status,0,r.output);return r.output.trim();
};
const folder=await mkdtemp(join(tmpdir(),'e08-native-python-'));
try{
 const file=join(folder,'python.yml');
 const source=body=>`name: Native Python check\non: push\npermissions:\n  contents: read\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - shell: python\n        run: ${body}\n`;
 const args=['--profile','correctness','--strict-exit','--no-ignores','--no-online','--no-color','--shellcheck',which('shellcheck'),'--pyflakes',which('pyflakes'),'--',file];
 const scanner=which('jactionlint');
 await writeFile(file,source('print("valid")'));const good=execute(scanner,args);assert.equal(good.status,0,good.output);
 await writeFile(file,source('print(undefined_name)'));const bad=execute(scanner,args);
 assert.notEqual(bad.status,0);assert.match(bad.output,/undefined_name/);assert.match(bad.output,/pyflakes/i);
 console.log(JSON.stringify({consumer:'mise-native-tools',versions,goodPythonAccepted:true,badPythonRejected:true,nativeDiagnostic:bad.output,result:'PASS'}));
}finally{await rm(folder,{recursive:true,force:true});}

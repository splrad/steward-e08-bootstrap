# 模板首次采用差异

原有内容保持。请在本 PR 中整合下列完整差异；下一次运行核对实际文件后更新此报告。

```json
{
  "templateSha": "185170c6de527d48433fe1c12f077cd6da81cc8f",
  "conflicts": [
    {
      "path": ".github/release-template.md.mustache",
      "current": "# E08 合成发行说明\r\n\r\n{{{body}}}\r\n",
      "generated": "# {{productName}} {{version}}\r\n\r\n{{{summary}}}\r\n\r\n## 升级须知\r\n\r\n### 兼容性\r\n\r\n{{{compatibility}}}\r\n\r\n### 升级与迁移\r\n\r\n{{{upgrade}}}\r\n\r\n### 资产与安装\r\n\r\n{{{downloads}}}\r\n\r\n{{{installation}}}\r\n\r\n### 已知问题\r\n\r\n{{{knownIssues}}}\r\n\r\n### 恢复\r\n\r\n{{{recovery}}}\r\n\r\n## 更新内容\r\n\r\n{{{userChanges}}}\r\n\r\n{{#hasContributors}}\r\n## 贡献者\r\n\r\n{{#contributors}}\r\n<a href=\"{{profileUrl}}\"><img src=\"{{avatarUrl}}\" alt=\"{{alt}}\" width=\"48\" height=\"48\"></a>\r\n{{/contributors}}\r\n\r\n{{/hasContributors}}\r\n## 完整变更\r\n\r\n- 完整变化：[{{sourceLinkLabel}}]({{{sourceUrl}}})\r\n- 源码提交：[{{sourceSha}}]({{{commitUrl}}})\r\n- 执行器提交：{{controllerSha}}\r\n- 校验文件：`SHA256SUMS`；产物清单：`artifact-manifest.json`；依赖清单：`sbom.spdx.json`。\r\n{{#channels}}\r\n- {{name}}：{{status}}。{{{location}}}\r\n{{/channels}}\r\n"
    }
  ],
  "preservedCustomFiles": [
    "CONTRIBUTING.md"
  ]
}
```

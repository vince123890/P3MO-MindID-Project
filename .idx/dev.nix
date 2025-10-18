{ pkgs }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
  ];
  idx.extensions = [
    "saoudrizwan.claude-dev"
  ];
  idx.workspace = {
    onCreate = {
      npm-install = "npm install";
      default.openFiles = [
        "docs/CREATE_MODULE.md"
      ];
    };
  };
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}

## [0.9.1](https://github.com/LetsStreamIt/frontend-service/compare/v0.9.0...v0.9.1) (2024-10-19)

### Dependency updates

* **deps:** add youtube types ([08186bc](https://github.com/LetsStreamIt/frontend-service/commit/08186bc8750c46a8995037dc15886a0e6e1f7c63))
* **deps:** add youtube types ([195516a](https://github.com/LetsStreamIt/frontend-service/commit/195516a3f54a93c66818bcaa9753c401bf3b0eae))
* **deps:** update dependency @vuepress/theme-default to v2.0.0-rc.55 ([2c12901](https://github.com/LetsStreamIt/frontend-service/commit/2c12901a0b8fdf02a3b5bb1b9b3111333e8d4d36))
* **deps:** update dependency eslint-plugin-vue to v9.29.0 ([f1ac5b3](https://github.com/LetsStreamIt/frontend-service/commit/f1ac5b35638f30c511d8437f6e86223e8691d607))
* **deps:** update dependency typescript-eslint to v8.9.0 ([588e7d5](https://github.com/LetsStreamIt/frontend-service/commit/588e7d59a6b3560bb764b5467f7d206d53609921))
* **deps:** update dependency vite to v5.4.9 ([08e2c37](https://github.com/LetsStreamIt/frontend-service/commit/08e2c375b3b5e112f4d5e254295bb046dee01350))
* **deps:** update dependency vitest to v2.1.3 ([587e4ad](https://github.com/LetsStreamIt/frontend-service/commit/587e4ad065a24311409eaaf1a6d686bd297333a9))
* **deps:** update dependency vue to v3.5.12 ([8a2e996](https://github.com/LetsStreamIt/frontend-service/commit/8a2e996db0e3653a7ad6376e506fe5331f6a2ed6))
* **deps:** update vuepress monorepo ([17ae446](https://github.com/LetsStreamIt/frontend-service/commit/17ae4460281b71585e48b679759bf8c614bbdde8))

### Bug Fixes

* leave session ([49013d5](https://github.com/LetsStreamIt/frontend-service/commit/49013d51731a6a999efa6f4277f35d752c79bcae))

### General maintenance

* add ack to chatController method ([d16412b](https://github.com/LetsStreamIt/frontend-service/commit/d16412b28d4db3338b5c8cc646d3f9ce0a9720bc))
* add ack to video controller ([6a87e08](https://github.com/LetsStreamIt/frontend-service/commit/6a87e0885a7580151ad7cfcf378dda4767f78c51))
* add queue of actions to execute in session frame ([f706f86](https://github.com/LetsStreamIt/frontend-service/commit/f706f86bb670d4924a64751c35f6fd9dfd371511))
* align model with session service, add command and notification types ([92c4017](https://github.com/LetsStreamIt/frontend-service/commit/92c401768377974d0fa94f8a1dbe8c16c0e294b7))
* format ([1442f76](https://github.com/LetsStreamIt/frontend-service/commit/1442f766b9e620f683fbdbc803e0b9066a2bab4f))
* model session controller return class ([4fe5799](https://github.com/LetsStreamIt/frontend-service/commit/4fe5799de9968982209f091e201a6990c511a664))
* move model package, add reusable composable ([220c95b](https://github.com/LetsStreamIt/frontend-service/commit/220c95bfbc7cc981b1ad8ec5fa4878fd70d87706))
* remove PlayerState, shift player actions in handler ([2971c3e](https://github.com/LetsStreamIt/frontend-service/commit/2971c3e308c79c72b1faa703587fa141ea710bc2))
* use connectionError composable inside SessionView ([d05fade](https://github.com/LetsStreamIt/frontend-service/commit/d05fade2000326e0699be1dac644b1a9d581a9a1))

### Refactoring

* methods reordering ([b11715c](https://github.com/LetsStreamIt/frontend-service/commit/b11715cd8d90b6e3448bbce0cba8028f21d5beea))

## [0.9.0](https://github.com/LetsStreamIt/frontend-service/compare/v0.8.0...v0.9.0) (2024-10-12)

### Features

* link join session popup to session page ([b926045](https://github.com/LetsStreamIt/frontend-service/commit/b926045ff9151d2314b6d5d2cf3facbc8996a9e9))

### Dependency updates

* **deps:** update dependency typescript to v5.6.3 ([35b4c11](https://github.com/LetsStreamIt/frontend-service/commit/35b4c11af07e27944385d17afeef5b19aaf2b8fa))

### Refactoring

* rename Join Session Popup to Create Session ([ab65274](https://github.com/LetsStreamIt/frontend-service/commit/ab652743303dc40cd364a5d407b53717cb402e32))

## [0.8.0](https://github.com/LetsStreamIt/frontend-service/compare/v0.7.0...v0.8.0) (2024-10-10)

### Features

* join existing room popup ([80abbcf](https://github.com/LetsStreamIt/frontend-service/commit/80abbcfce93133ad9c46362fcf1fe20694deedb3))
* join room from popup window ([0aea3b4](https://github.com/LetsStreamIt/frontend-service/commit/0aea3b4864069fc273a8e6781e71d26b793f8b3b))

### Dependency updates

* **deps:** update dependency typescript-eslint to v8.8.1 ([b332edf](https://github.com/LetsStreamIt/frontend-service/commit/b332edfdf18e87af4555673f216b4044e563491f))

### General maintenance

* add session id param ([9e67227](https://github.com/LetsStreamIt/frontend-service/commit/9e6722780a223350f657b057d69c7aa38fe9f893))
* emit message from session popup when user joins to close the modal ([3903bba](https://github.com/LetsStreamIt/frontend-service/commit/3903bbacf5c9b8f0126d1ec35c77d957321062aa))

### Refactoring

* remove comment and useless socket file ([5319b70](https://github.com/LetsStreamIt/frontend-service/commit/5319b70aa61118b3aa81490249037398f0f752bd))

## [0.7.0](https://github.com/LetsStreamIt/frontend-service/compare/v0.6.0...v0.7.0) (2024-10-10)

### Features

* synchronized video play and stop across users connected to a room ([9406f17](https://github.com/LetsStreamIt/frontend-service/commit/9406f176b55e5912774358b4d70a75556e9599d1))

### Refactoring

* add function to minimize repetitions, remove logs ([4b8c59e](https://github.com/LetsStreamIt/frontend-service/commit/4b8c59eafb1af1c298df1c6efc75f823e88aa8e4))

## [0.6.0](https://github.com/LetsStreamIt/frontend-service/compare/v0.5.1...v0.6.0) (2024-10-09)

### Features

* synch video state and timestamp at user join, play/stop sync from server ([4968338](https://github.com/LetsStreamIt/frontend-service/commit/4968338be6ae412883942b97d2e09f7e416b1edd))

### Dependency updates

* **deps:** update commitlint monorepo to v19.5.0 ([2afa74f](https://github.com/LetsStreamIt/frontend-service/commit/2afa74fe640e3b5d8f353b52ed40326e73e601be))
* **deps:** update dependency @commitlint/cli to v19.4.1 ([cc65271](https://github.com/LetsStreamIt/frontend-service/commit/cc6527194d6219010ae7a2924b1adcb6bcf5d4f6))
* **deps:** update dependency @commitlint/config-conventional to v19.4.1 ([bc3ebfb](https://github.com/LetsStreamIt/frontend-service/commit/bc3ebfb51abdaa6c89e9227a182d971c04fbd261))
* **deps:** update dependency @eslint/js to v9.10.0 ([a6e073b](https://github.com/LetsStreamIt/frontend-service/commit/a6e073b12427b91dd1b6bb63ffc31935766f8a84))
* **deps:** update dependency @eslint/js to v9.11.0 ([30f9df5](https://github.com/LetsStreamIt/frontend-service/commit/30f9df57fae7cad3f2a9bae97c005a1c13ff9dc2))
* **deps:** update dependency @eslint/js to v9.11.1 ([cf1fe36](https://github.com/LetsStreamIt/frontend-service/commit/cf1fe3672e65497515db5595d91713398086d694))
* **deps:** update dependency @eslint/js to v9.12.0 ([92b266f](https://github.com/LetsStreamIt/frontend-service/commit/92b266f1bd5e46b8ae5be2c96828a14040a6bb29))
* **deps:** update dependency @vitejs/plugin-vue to v5.1.3 ([0559f0c](https://github.com/LetsStreamIt/frontend-service/commit/0559f0c5f9fbd57fed084eba2315320cd374bd01))
* **deps:** update dependency @vitejs/plugin-vue to v5.1.4 ([6cb6fba](https://github.com/LetsStreamIt/frontend-service/commit/6cb6fbaddf1bccbec165ad91e4952909e92db542))
* **deps:** update dependency @vue/eslint-config-prettier to v10 ([d106def](https://github.com/LetsStreamIt/frontend-service/commit/d106def63f8b5c0ecd03e3dcf4365791fb541e25))
* **deps:** update dependency @vuepress/theme-default to v2.0.0-rc.43 ([a0294e4](https://github.com/LetsStreamIt/frontend-service/commit/a0294e4104d2112a97cdcbde8099ed4b55f8f24a))
* **deps:** update dependency @vuepress/theme-default to v2.0.0-rc.44 ([fac818e](https://github.com/LetsStreamIt/frontend-service/commit/fac818e622405152a4e165ce0ca91f7921eb69a5))
* **deps:** update dependency @vuepress/theme-default to v2.0.0-rc.45 ([7b4ca98](https://github.com/LetsStreamIt/frontend-service/commit/7b4ca980327d15ffcd26ba3fbe379c0c059f2851))
* **deps:** update dependency @vuepress/theme-default to v2.0.0-rc.46 ([6216d3d](https://github.com/LetsStreamIt/frontend-service/commit/6216d3dbe9ea0ad04762da427d03d1736f66b7f9))
* **deps:** update dependency @vuepress/theme-default to v2.0.0-rc.47 ([989c12f](https://github.com/LetsStreamIt/frontend-service/commit/989c12ff12cb41cf843ea94ff76417399164f4a2))
* **deps:** update dependency @vuepress/theme-default to v2.0.0-rc.49 ([9c7ae07](https://github.com/LetsStreamIt/frontend-service/commit/9c7ae07104f17a1c9ef5d6d3ab42f7728c203983))
* **deps:** update dependency axios to v1.7.6 ([f5ebee0](https://github.com/LetsStreamIt/frontend-service/commit/f5ebee06377d66287a4b9306042fec5e7175e633))
* **deps:** update dependency axios to v1.7.7 ([da4d0c1](https://github.com/LetsStreamIt/frontend-service/commit/da4d0c16d912d9deff5a62fca0990f668dd92597))
* **deps:** update dependency eslint to v8.57.1 ([f882c6a](https://github.com/LetsStreamIt/frontend-service/commit/f882c6af1e55106bf42e62c4a9b23ad69c62fdf6))
* **deps:** update dependency eslint-plugin-vue to v9.28.0 ([6a63e9a](https://github.com/LetsStreamIt/frontend-service/commit/6a63e9a109effa49046091b45d997ac856cf6108))
* **deps:** update dependency husky to v9.1.6 ([6325e30](https://github.com/LetsStreamIt/frontend-service/commit/6325e306290d2686726f83d231d5f36b20391d82))
* **deps:** update dependency jsdom to v24.1.3 ([f14ba29](https://github.com/LetsStreamIt/frontend-service/commit/f14ba29f5af0fd4fda5c76fac67bbfc33318c363))
* **deps:** update dependency jsdom to v25 ([abfa83a](https://github.com/LetsStreamIt/frontend-service/commit/abfa83ab787c85fe8466d40d01d6708d4f48b49d))
* **deps:** update dependency jsdom to v25.0.1 ([3efab5a](https://github.com/LetsStreamIt/frontend-service/commit/3efab5ae7052686e7a420abfed5d914cd22be0a8))
* **deps:** update dependency pinia to v2.2.3 ([8c894b9](https://github.com/LetsStreamIt/frontend-service/commit/8c894b9c4db08869afbc99665f9ab39c5c004da9))
* **deps:** update dependency pinia to v2.2.4 ([fef019f](https://github.com/LetsStreamIt/frontend-service/commit/fef019f5a009048bb17a4dc27e98173d3c48c1a3))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.102 ([a6e72f8](https://github.com/LetsStreamIt/frontend-service/commit/a6e72f895fc0163e95a3fa3558b3179ec0920c3c))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.103 ([1793623](https://github.com/LetsStreamIt/frontend-service/commit/179362325a7435e0cb1efaa3e5968534f02097a6))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.104 ([9dd7857](https://github.com/LetsStreamIt/frontend-service/commit/9dd785700cd15f570be511ec8755ebc79c6ae185))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.105 ([a8c10e9](https://github.com/LetsStreamIt/frontend-service/commit/a8c10e98a397a0e80a1cd6b50603fa256d5ad2c8))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.106 ([a2a9ceb](https://github.com/LetsStreamIt/frontend-service/commit/a2a9ceb9ffb03b3f55c1f0f3c375d66097de776f))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.107 ([b8bec25](https://github.com/LetsStreamIt/frontend-service/commit/b8bec251ab03ffd5c58513b98a9e1dad4fb95fea))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.108 ([1792b6d](https://github.com/LetsStreamIt/frontend-service/commit/1792b6dc2a8d6439250553e671161480a56d8c3d))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.109 ([ca6c01c](https://github.com/LetsStreamIt/frontend-service/commit/ca6c01c6669973a60d295ba63de674e962a46d3d))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.110 ([2a3df41](https://github.com/LetsStreamIt/frontend-service/commit/2a3df416c805bbcc5d8094f638420482f72606f2))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.111 ([9b5e6eb](https://github.com/LetsStreamIt/frontend-service/commit/9b5e6eba3fdf0a1513c0418ea37767be1c98ce4e))
* **deps:** update dependency socket.io-client to v4.8.0 ([39482ac](https://github.com/LetsStreamIt/frontend-service/commit/39482aca8ee958d0404e6e28f171c34a18fca4fc))
* **deps:** update dependency typescript to v5.6.2 ([e3bb8e2](https://github.com/LetsStreamIt/frontend-service/commit/e3bb8e29b65221063080338b9a4c87d7fdb000b6))
* **deps:** update dependency typescript-eslint to v8.3.0 ([58684db](https://github.com/LetsStreamIt/frontend-service/commit/58684dbe9eb12f3195508db5f74597bd9393fb9c))
* **deps:** update dependency typescript-eslint to v8.4.0 ([1043ede](https://github.com/LetsStreamIt/frontend-service/commit/1043edebdce2bb2ad0947d37a8a619fbb878a314))
* **deps:** update dependency typescript-eslint to v8.5.0 ([4e624e3](https://github.com/LetsStreamIt/frontend-service/commit/4e624e378fc57b9c867b1f05f79c59f25da31df2))
* **deps:** update dependency typescript-eslint to v8.6.0 ([3f52527](https://github.com/LetsStreamIt/frontend-service/commit/3f525272c1cbcf7f50fc7c1b01c3f588ddeb52bf))
* **deps:** update dependency typescript-eslint to v8.7.0 ([974463d](https://github.com/LetsStreamIt/frontend-service/commit/974463d24dc8a23a65181784b29ee93bcbf723d3))
* **deps:** update dependency typescript-eslint to v8.8.0 ([84c8fca](https://github.com/LetsStreamIt/frontend-service/commit/84c8fca51abcc2d3122b93c5724a6bef901a89ea))
* **deps:** update dependency vite to v5.4.3 ([ae360e0](https://github.com/LetsStreamIt/frontend-service/commit/ae360e05724a078b6a39f6c287d57dec92f7e206))
* **deps:** update dependency vite to v5.4.4 ([79840ab](https://github.com/LetsStreamIt/frontend-service/commit/79840abc78f80e9ffd01662508965773f66e6af6))
* **deps:** update dependency vite to v5.4.5 ([ef7bd4b](https://github.com/LetsStreamIt/frontend-service/commit/ef7bd4b1dd517f7267058bc1c4f79bf2c34a2626))
* **deps:** update dependency vite to v5.4.6 [security] ([6b14306](https://github.com/LetsStreamIt/frontend-service/commit/6b143061f9d1760be10476121995997d80a945e3))
* **deps:** update dependency vite to v5.4.7 ([05688b5](https://github.com/LetsStreamIt/frontend-service/commit/05688b5bd0fceb2ba8924b15fa1cf7d7474987ac))
* **deps:** update dependency vite to v5.4.8 ([a636aa7](https://github.com/LetsStreamIt/frontend-service/commit/a636aa7087f53cd6abb0b404919e4f28c061aa96))
* **deps:** update dependency vitest to v2.1.0 ([a4d906d](https://github.com/LetsStreamIt/frontend-service/commit/a4d906d0ecbdf08a189685e1770f8dc9c872ea79))
* **deps:** update dependency vitest to v2.1.1 ([8954a52](https://github.com/LetsStreamIt/frontend-service/commit/8954a526dd7bef7cfc511158a37205f99c04fc14))
* **deps:** update dependency vitest to v2.1.2 ([8613475](https://github.com/LetsStreamIt/frontend-service/commit/8613475da5599386617b13bfc5151a917553262f))
* **deps:** update dependency vue to v3.5.0 ([d05ae5f](https://github.com/LetsStreamIt/frontend-service/commit/d05ae5fc9589eaecad0bf9c966f16328a36100c9))
* **deps:** update dependency vue to v3.5.1 ([709f3a5](https://github.com/LetsStreamIt/frontend-service/commit/709f3a508468e030276556107431cf2ad070c6d1))
* **deps:** update dependency vue to v3.5.10 ([dae1658](https://github.com/LetsStreamIt/frontend-service/commit/dae16585d046bacaaa442c179244cad5629eca19))
* **deps:** update dependency vue to v3.5.11 ([ca3329b](https://github.com/LetsStreamIt/frontend-service/commit/ca3329b47beda3c4dd008314bdd1f03c88e3445c))
* **deps:** update dependency vue to v3.5.2 ([1ff7e2b](https://github.com/LetsStreamIt/frontend-service/commit/1ff7e2bc11f74de6e91414be70e6f2dfe1a56add))
* **deps:** update dependency vue to v3.5.3 ([6d222d8](https://github.com/LetsStreamIt/frontend-service/commit/6d222d8235e5a82ebd374a45f8ee7548ffc7fb80))
* **deps:** update dependency vue to v3.5.4 ([92195a1](https://github.com/LetsStreamIt/frontend-service/commit/92195a1a6532e3be0c6d9f32eb460f34f9154e08))
* **deps:** update dependency vue to v3.5.5 ([d86aec0](https://github.com/LetsStreamIt/frontend-service/commit/d86aec0790f56b0a886c070a9e9bf14a2753727e))
* **deps:** update dependency vue to v3.5.6 ([fdddcbd](https://github.com/LetsStreamIt/frontend-service/commit/fdddcbde3299ac937f4b894216b2552b90fef507))
* **deps:** update dependency vue to v3.5.9 ([2ad955d](https://github.com/LetsStreamIt/frontend-service/commit/2ad955dbf2f3b7be3ce60ca16ada900386b58083))
* **deps:** update dependency vue-router to v4.4.4 ([a0b9e77](https://github.com/LetsStreamIt/frontend-service/commit/a0b9e776b78e3685c591c40bd76b23a5e14cb767))
* **deps:** update dependency vue-router to v4.4.5 ([56675df](https://github.com/LetsStreamIt/frontend-service/commit/56675df5e60f0128319401273f1db4e237e69404))
* **deps:** update vuepress monorepo ([5a9def5](https://github.com/LetsStreamIt/frontend-service/commit/5a9def53e33c5e90600b8a5ab7af230b6a709569))

### Build and continuous integration

* **deps:** update actions/setup-node action to v4.0.4 ([f7c7e95](https://github.com/LetsStreamIt/frontend-service/commit/f7c7e9593ebf4b2ab1e26d0054c93a117c9a8ee9))
* **deps:** update danysk/action-checkout action to v0.2.20 ([c47864d](https://github.com/LetsStreamIt/frontend-service/commit/c47864d6432c7360343318e452be9335c2a66391))
* **deps:** update danysk/action-checkout action to v0.2.21 ([bb29ca7](https://github.com/LetsStreamIt/frontend-service/commit/bb29ca76562bfd48364be8e5cedb02810ad5cb9a))
* **deps:** update docker/build-push-action digest to 4f58ea7 ([54b5391](https://github.com/LetsStreamIt/frontend-service/commit/54b53910421acaeb6f2698c305099f171e183d00))
* **deps:** update docker/build-push-action digest to e44afff ([5241ee0](https://github.com/LetsStreamIt/frontend-service/commit/5241ee08a3a2b78fb860114d1e1ed6f72e98951f))
* **deps:** update docker/login-action digest to 1f36f5b ([57c44fb](https://github.com/LetsStreamIt/frontend-service/commit/57c44fbd1987a08e0d8f8211a6048a2671b5801b))
* **deps:** update docker/login-action digest to 29df2a9 ([ca07a3d](https://github.com/LetsStreamIt/frontend-service/commit/ca07a3d51d0cd4422b2896da318230b0509cedfd))
* **deps:** update docker/login-action digest to 3b8fed7 ([58a508d](https://github.com/LetsStreamIt/frontend-service/commit/58a508dbcb6aaa52df1657e6b2a51b2a34c4564d))
* **deps:** update docker/metadata-action digest to 70b2cdc ([85b1f04](https://github.com/LetsStreamIt/frontend-service/commit/85b1f04faaaa6556baee95e0141462ab91cd75da))

### General maintenance

* add value objects for video status and deserializer for communication ([94322e9](https://github.com/LetsStreamIt/frontend-service/commit/94322e9400b45be37fafc56a769e6971d3c55fcd))
* emit message to parent component when chat is mounted ([ed5db51](https://github.com/LetsStreamIt/frontend-service/commit/ed5db515c8a27333619747a5cfd6e390c10cee2b))
* separate room join and connection ([aca6407](https://github.com/LetsStreamIt/frontend-service/commit/aca640779be998b4a43e804ac2087bebe112c251))
* working communication for video sync with session-service ([fe63b41](https://github.com/LetsStreamIt/frontend-service/commit/fe63b419a2cb1f56336407c28be658f730113900))

## [0.5.1](https://github.com/LetsStreamIt/frontend-service/compare/v0.5.0...v0.5.1) (2024-08-28)

### Bug Fixes

* fixed auth check on page access ([ad8613a](https://github.com/LetsStreamIt/frontend-service/commit/ad8613a91dedb69c936bb38e94ec2a46d73a90ec))

### General maintenance

* remove auth check were not needed ([6ed42ed](https://github.com/LetsStreamIt/frontend-service/commit/6ed42ed5c65e37ddac164a119ff47d4255efa2c3))

## [0.5.0](https://github.com/LetsStreamIt/frontend-service/compare/v0.4.2...v0.5.0) (2024-08-28)

### Features

* added auth routes checking ([9624422](https://github.com/LetsStreamIt/frontend-service/commit/9624422f839764fbb2ea702e431ffef22eeb1228))

### General maintenance

* refine chat style, remove image on messages ([ec3d61d](https://github.com/LetsStreamIt/frontend-service/commit/ec3d61d08bb306565ba94408d6cc98f0ccd480e7))

## [0.4.2](https://github.com/LetsStreamIt/frontend-service/compare/v0.4.1...v0.4.2) (2024-08-27)

### Bug Fixes

* imports ([31762b0](https://github.com/LetsStreamIt/frontend-service/commit/31762b015fb600cf0482ca3f23eea62e5b702e02))

### General maintenance

* del already copied controller ([cdf1989](https://github.com/LetsStreamIt/frontend-service/commit/cdf198913c0e34bcfe94b01552da1851111ece27))
* style notification message ([43f7bf9](https://github.com/LetsStreamIt/frontend-service/commit/43f7bf9551f472765d563941d02752b4624b0cea))

### Refactoring

* chat components code ([b4ff9c0](https://github.com/LetsStreamIt/frontend-service/commit/b4ff9c0da9d86800b5c47d18531983eed2967c49))
* directory structure ([e690ee4](https://github.com/LetsStreamIt/frontend-service/commit/e690ee494c365fcba0df2d3115d40fcd12000eea))
* refactor SessionChat variables, add disconnection onUnmounted ([dd5fb91](https://github.com/LetsStreamIt/frontend-service/commit/dd5fb919474661896e743b10a2008b27636d2c22))

## [0.4.1](https://github.com/LetsStreamIt/frontend-service/compare/v0.4.0...v0.4.1) (2024-08-27)

### Dependency updates

* **deps:** update dependency @eslint/js to v9.9.1 ([45b960a](https://github.com/LetsStreamIt/frontend-service/commit/45b960a14c77afe2038a9f297b33d2e128dfedbc))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.101 ([262bdf0](https://github.com/LetsStreamIt/frontend-service/commit/262bdf01a5f13bf4dda153d76c3d4924dd983073))
* **deps:** update vuepress monorepo ([60c076f](https://github.com/LetsStreamIt/frontend-service/commit/60c076f7cc6abd11f099faa1d03ec9dd30784686))

### Bug Fixes

* add shared model ([e879ae4](https://github.com/LetsStreamIt/frontend-service/commit/e879ae4f70d0747d124bf7b4ed1fc25a535d2b53))

## [0.4.0](https://github.com/LetsStreamIt/frontend-service/compare/v0.3.0...v0.4.0) (2024-08-24)

### Features

* completed login page ([90fa62d](https://github.com/LetsStreamIt/frontend-service/commit/90fa62d9c9d35c388befe18c6b191a8647a2e734))

### Dependency updates

* **deps:** update dependency @vuepress/theme-default to v2.0.0-rc.41 ([95ffc43](https://github.com/LetsStreamIt/frontend-service/commit/95ffc434f5b244687d5b741e7efd0b065860fc4b))
* **deps:** update dependency husky to v9.1.5 ([851bc6e](https://github.com/LetsStreamIt/frontend-service/commit/851bc6e55c883aec88d97dd02643c62ddb1ed2f3))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.96 ([f7c46d6](https://github.com/LetsStreamIt/frontend-service/commit/f7c46d65b40872257b2ae05426350f89b9f21cf6))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.97 ([96baa71](https://github.com/LetsStreamIt/frontend-service/commit/96baa71883735bddf5bf07043d323ff3cc138300))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.98 ([2794fc3](https://github.com/LetsStreamIt/frontend-service/commit/2794fc3228c5d95726acce5e30a409ebc7e6fcbb))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.99 ([f271abf](https://github.com/LetsStreamIt/frontend-service/commit/f271abf7ea5239c58c6b192f5e88428689743f04))
* **deps:** update dependency typescript-eslint to v8.1.0 ([fdb049f](https://github.com/LetsStreamIt/frontend-service/commit/fdb049fd42aa0dc111518df529ff6d8ac7bb2dfb))
* **deps:** update dependency typescript-eslint to v8.2.0 ([39bc4ae](https://github.com/LetsStreamIt/frontend-service/commit/39bc4aebf00f37a53b682f9d91cdde733510beb0))
* **deps:** update dependency vite to v5.4.1 ([96bbb5f](https://github.com/LetsStreamIt/frontend-service/commit/96bbb5f52c28753f57f476938b354c23bf0112ec))
* **deps:** update dependency vite to v5.4.2 ([c19fbda](https://github.com/LetsStreamIt/frontend-service/commit/c19fbda410b0cda7868d6eade866ce221bd1ada3))
* **deps:** update dependency vue to v3.4.38 ([1021072](https://github.com/LetsStreamIt/frontend-service/commit/1021072be85b81d3a526f001ffa9a3e76510c9a5))

### Build and continuous integration

* **deps:** update docker/build-push-action digest to 5cd11c3 ([e432f27](https://github.com/LetsStreamIt/frontend-service/commit/e432f271045a29709bd29ea06930db8c7cadaef9))

### General maintenance

* basic login implementation ([370ba17](https://github.com/LetsStreamIt/frontend-service/commit/370ba172f63605a813ca5e9f17768536a5504710))
* update gitignore ([c49b789](https://github.com/LetsStreamIt/frontend-service/commit/c49b7891a4f9f505dc15636e84fb0758520a0487))

## [0.3.0](https://github.com/LetsStreamIt/frontend-service/compare/v0.2.0...v0.3.0) (2024-08-12)

### Features

* scrolling and responsive chat ([dcc22cc](https://github.com/LetsStreamIt/frontend-service/commit/dcc22cc6e24214fb4886446e6f92ea0a57a43fbc))

### Dependency updates

* **deps:** update dependency vue to v3.4.37 ([c04b5d0](https://github.com/LetsStreamIt/frontend-service/commit/c04b5d017aa860760d6fb4a702458346b94546ac))

### General maintenance

* format code ([220131a](https://github.com/LetsStreamIt/frontend-service/commit/220131abaa7ad77bb50250313e3f636d666efbc9))
* organize containers and layouts ([d0a5ecb](https://github.com/LetsStreamIt/frontend-service/commit/d0a5ecbacd1ee37f14820128a290362fd0da42d4))

## [0.2.0](https://github.com/LetsStreamIt/frontend-service/compare/v0.1.0...v0.2.0) (2024-08-10)

### Features

* simple home, header and footer ([e307b4d](https://github.com/LetsStreamIt/frontend-service/commit/e307b4d2273b8a930c6c0785d73ed2dd16ea79c6))

### Dependency updates

* **deps:** update dependency vitest to v2 ([c9b5294](https://github.com/LetsStreamIt/frontend-service/commit/c9b5294a361534f1b3e55b98db0a8939b1a4bae4))

### General maintenance

* add release config ([b08d7fd](https://github.com/LetsStreamIt/frontend-service/commit/b08d7fd3f4b1f5bfbfe1647667d253cd7042edc6))
* configure eslint ([b0174c5](https://github.com/LetsStreamIt/frontend-service/commit/b0174c5f0e36406fe6bf0997af0c548c9f2a7f1c))
* default and session layouts, common layout components ([ed350ab](https://github.com/LetsStreamIt/frontend-service/commit/ed350abd868ff7e504ffecddd5dcc1f5c76a7050))

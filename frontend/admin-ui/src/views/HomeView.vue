<template>
  <div>
    <!-- Form for SiteConfig -->

    <button @click.stop="() => clearCloudFrontCache('*')" :disabled="isLoadingAny">
      Clear All CloudFront Cache
    </button>

    <button @click="regenerateAllPages" :disabled="isLoadingAny">
      Regenerate All Pages
    </button>

    <!-- Additional controls go here -->
  </div>
</template>

<script lang="ts" setup>
import { PageService } from '@/service/PageService';
import { SiteConfigService, CloudFrontService } from '@/service';
import adminUrl from '@/state/adminUrl';
import { siteConfigCurrent, siteConfigEdit } from '@/state/configState';
import { ref, onMounted } from 'vue';
import useLoading, {isLoadingAny} from '@/composables/useLoading';

const siteConfigService: SiteConfigService = new SiteConfigService(adminUrl.value);
const cloudFrontService: CloudFrontService = new CloudFrontService(adminUrl.value);
const pageService = new PageService(adminUrl.value);


const fetchSiteConfig = async () => {
const { startLoadingThis, stopLoadingThis } = useLoading();
  startLoadingThis();
  await siteConfigService.fetchSiteConfig();
  siteConfigEdit.value = siteConfigCurrent.value;
  stopLoadingThis();
};

const saveSiteConfig = async () => {
const { startLoadingThis, stopLoadingThis } = useLoading();
  startLoadingThis();
  await siteConfigService.saveSiteConfig();
  stopLoadingThis();
};

const clearCloudFrontCache = async (regex: string) => {
const { startLoadingThis, stopLoadingThis } = useLoading();
  startLoadingThis();
  await cloudFrontService.invalidateByRegex(regex)
  stopLoadingThis();
};

const regenerateAllPages = async () => {
const { startLoadingThis, stopLoadingThis } = useLoading();
  startLoadingThis();
  await pageService.regenerateAll();
  stopLoadingThis();
};

// Fetch site configuration on component mount
onMounted(async () => {
  await fetchSiteConfig();
});
</script>

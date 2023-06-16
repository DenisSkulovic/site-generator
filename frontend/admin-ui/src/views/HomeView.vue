<template>
  <v-container>
    <!-- Form for SiteConfig -->
    <v-row>
      <v-col>
        <v-btn @click.stop="handleClearCloudFrontCache" :disabled="isLoadingAny">
          Clear All CloudFront Cache
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="handleRegenerateAllPages" :disabled="isLoadingAny">
          Regenerate All Pages
        </v-btn>
      </v-col>
    </v-row>
    <!-- Additional controls go here -->
  </v-container>
</template>


<script lang="ts" setup>
import { SiteConfigService, CloudFrontService } from '@/service';
import adminUrl from '@/state/adminUrl';
import { siteConfigCurrent, siteConfigEdit } from '@/state/configState';
import { onMounted } from 'vue';
import useLoading, { isLoadingAny } from '@/composables/useLoading';
import { handleRegenerateAllPages, handleSaveSiteConfig, handleClearCloudFrontCache } from '@/logic/handlers';

const siteConfigService: SiteConfigService = new SiteConfigService(adminUrl.value);


const fetchSiteConfig = async () => {
  const { startLoadingThis, stopLoadingThis } = useLoading();
  startLoadingThis();
  await siteConfigService.fetchSiteConfig();
  siteConfigEdit.value = siteConfigCurrent.value;
  stopLoadingThis();
};






// Fetch site configuration on component mount
onMounted(async () => {
  await fetchSiteConfig();
});
</script>

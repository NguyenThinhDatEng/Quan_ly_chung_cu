import { computed, onMounted, ref } from "vue";
// store
import apartmentStore from "@/stores/views/apartmentStore.js";
import residentStore from "@/stores/views/residentStore.js";
import vehicleStore from "@/stores/views/vehicleStore";
// enum
import _enum from "@/commons/enum";

export const useOverView = () => {
  const url = `https://ducanhland.com/wp-content/uploads/2021/03/Chung-cu-Housinco-Premium-01.jpg`;
  // ['fill', 'contain', 'cover', 'none', 'scale-down']
  const fit = "fill";

  const loading = ref(true);

  const noOfApartment = computed(() => {
    const items = apartmentStore?.state?.items ?? [];
    const noOfIsEmpty = items.reduce(
      (acc, curr) =>
        curr.status == _enum.ApartmentStatus.IsEmpty ? acc + 1 : acc,
      0
    );
    return {
      isEmpty: noOfIsEmpty,
      all: items.length,
    };
  });

  const noOfResidents = computed(() => {
    const items = residentStore?.state?.items ?? [];
    return items.length;
  });

  const noOfVehicles = computed(() => {
    const items = vehicleStore?.state?.items ?? [];
    return items.length;
  });

  onMounted(async () => {
    await getRelatedData(apartmentStore);
    await getRelatedData(residentStore);
    loading.value = false;
  });

  const getRelatedData = async (store) => {
    const items = store?.state?.items ?? [];
    if (items.length == 0 && typeof store.dispatch == "function") {
      await store.dispatch(_enum.Store.Mutations.GetAll);
    }
  };

  return { url, fit, noOfApartment, loading, noOfResidents, noOfVehicles };
};

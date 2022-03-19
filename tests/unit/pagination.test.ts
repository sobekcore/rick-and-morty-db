import { shallowMount } from "@vue/test-utils";

import Pagination from "@/components/pagination.vue";

describe("pagination.vue", (): void => {
  const NUMBER_OF_PAGES: number = 2;

  test("component should be hidden on favorites page", (): void => {
    const component = shallowMount(Pagination, {
      props: {
        showFavorites: true,
        information: {
          pages: NUMBER_OF_PAGES,
        },
      },
    });

    /* Check if component is hidden on favorites page */ {
      const pagination = component.find(".pagination");
      expect(Object.keys(pagination).length).toBeFalsy();
    }
  });

  test("component should activate pagination on click", (): void => {
    const component = shallowMount(Pagination, {
      props: {
        showFavorites: false,
        information: {
          pages: NUMBER_OF_PAGES,
        },
      },
    });

    /* Check if component activates pagination on click */ {
      const { element: button } = component.find(".show-more");
      const clickEvent: Event = new Event("click");
      button.dispatchEvent(clickEvent);

      const { element: list } = component.find(".page-list");
      const isActive: boolean = list.classList.contains("is-active");

      expect(isActive).toBeTruthy();
    }
  });

  test("component should change pages on demand", (): void => {
    const component = shallowMount(Pagination, {
      props: {
        showFavorites: false,
        information: {
          pages: NUMBER_OF_PAGES,
        },
      },
    });

    const initialPage: number = component.vm.page;
    const targetPage: number = initialPage + 1;

    /* Check if changing pages changes page state */ {
      expect(component.vm.page).toBe(initialPage);
      component.vm.changePage(targetPage);
      expect(component.vm.page).toBe(targetPage);
    }
  });

  test("component should emit value when changing pages", (): void => {
    const component = shallowMount(Pagination, {
      props: {
        showFavorites: false,
        information: {
          pages: NUMBER_OF_PAGES,
        },
      },
    });

    const initialPage: number = component.vm.page;
    const targetPage: number = initialPage + 1;

    /* Check if changing pages emits value */ {
      component.vm.changePage(targetPage);
      const emitted = component.emitted();
      const [emittedValue] = emitted["page"];

      expect(emittedValue).toBeTruthy();
    }
  });
});

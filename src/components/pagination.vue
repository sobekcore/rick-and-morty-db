<template>
  <!-- Rendering pagination buttons depending on page states -->
  <nav class="pagination" v-if="!showFavorites">
    <button class="show-more" @click="showPagination()">Pages...</button>

    <ul ref="pagination" class="page-list">
      <!-- Change pages by 1 or all backwards -->
      <li class="page-section">
        <div v-if="page > 1" class="page special" @click="changePage(1)">
          <img alt="Pointer" class="pointer" src="@/assets/pointer.svg" />
          <img alt="Pointer" class="pointer" src="@/assets/pointer.svg" />
        </div>
        <div v-else class="page special disabled">
          <img alt="Pointer" class="pointer" src="@/assets/pointer-disabled.svg" />
          <img alt="Pointer" class="pointer" src="@/assets/pointer-disabled.svg" />
        </div>
      </li>
      <li class="page-section">
        <div v-if="page > 1" class="page special" @click="changePage(--page)">
          <img alt="Pointer" class="pointer" src="@/assets/pointer.svg" />
        </div>
        <div v-else class="page special disabled">
          <img alt="Pointer" class="pointer" src="@/assets/pointer-disabled.svg" />
        </div>
      </li>

      <!-- Change pages by exact number of provided amounts -->
      <li class="page-section" v-for="index in information.pages" :key="index">
        <div class="page" v-if="index === page - 2" @click="changePage(page - 2)">
          {{ index }}
        </div>
        <div class="page" v-if="index === page - 1" @click="changePage(page - 1)">
          {{ index }}
        </div>
        <div class="page is-active" v-if="index === page">{{ index }}</div>
        <div class="page" v-if="index === page + 1" @click="changePage(page + 1)">
          {{ index }}
        </div>
        <div class="page" v-if="index === page + 2" @click="changePage(page + 2)">
          {{ index }}
        </div>
        <div class="page spread disabled" v-if="index === page + 5">...</div>
        <div class="page" v-if="index === page + 7" @click="changePage(page + 7)">
          {{ index }}
        </div>
      </li>

      <!-- Change pages by 1 or all forwards -->
      <li class="page-section">
        <div v-if="page < information.pages" class="page special" @click="changePage(++page)">
          <img alt="Pointer" class="pointer-flip" src="@/assets/pointer.svg" />
        </div>
        <div v-else class="page special disabled">
          <img alt="Pointer" class="pointer-flip" src="@/assets/pointer-disabled.svg" />
        </div>
      </li>
      <li class="page-section">
        <div
          v-if="page < information.pages"
          class="page special"
          @click="changePage(information.pages)"
        >
          <img alt="Pointer" class="pointer-flip" src="@/assets/pointer.svg" />
          <img alt="Pointer" class="pointer-flip" src="@/assets/pointer.svg" />
        </div>
        <div v-else class="page special disabled">
          <img alt="Pointer" class="pointer-flip" src="@/assets/pointer-disabled.svg" />
          <img alt="Pointer" class="pointer-flip" src="@/assets/pointer-disabled.svg" />
        </div>
        <div></div>
      </li>
    </ul>
  </nav>

  <!-- Margin for a pagination fixed div -->
  <div class="pagination-margin" v-if="!showFavorites"></div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  name: "Pagination",
  emits: ["page"],
  props: {
    information: {
      type: Object,
    },
    showFavorites: {
      type: Boolean,
    },
  },
  setup(props, context) {
    const page: Ref<number> = ref(1);
    const changePage = (target: number): void => {
      page.value = target;
      context.emit("page", target);
    };

    const pagination: Ref<HTMLElement | null> = ref(null);
    const showPagination = (): void => {
      const paginationElement: HTMLElement | null = pagination.value;

      if (paginationElement instanceof HTMLElement) {
        const isActive: boolean = paginationElement.className.includes("is-active");
        paginationElement.className = isActive ? "page-list" : "page-list is-active";
      }
    };

    return {
      page,
      changePage,
      pagination,
      showPagination,
    };
  },
});
</script>

<style scoped lang="scss">
.pagination {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: auto;
  background: $white-50;
  border-top: 2px solid $white-200;
  padding: 22.5px 0;

  .show-more {
    display: none;

    @media (max-width: $mobile-breakpoint) {
      @include default-big-font($brand-color);
      display: block;
      background: none;
      border: none;
      outline: none;
      width: 100%;
      margin: -24px 0;
      padding: 15px 0;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .page-list {
    list-style-type: none;
    margin: 0 0 0 60px;
    padding: 0;

    @media (max-width: $tablet-breakpoint) {
      text-align: center;
      margin-left: 0;
    }

    @media (max-width: $mobile-breakpoint) {
      display: none;

      &.is-active {
        display: block;
        margin-top: 24px;
      }
    }

    .page-section {
      display: inline-block;
      user-select: none;

      .page {
        @include default-small-font;
        margin: 5px;
        padding: 8px 0;
        border-radius: 10px;
        border: 2px solid $white-300;
        font-weight: 500;
        text-align: center;
        width: 48px;
        transition: 0.18s box-shadow, 0.25s border;

        &:not(.disabled):hover {
          box-shadow: 0 0 12px $brand-color;
          border: 2px solid $brand-color;
          cursor: pointer;
        }

        &.special {
          .pointer {
            transform: translateY(-10%);
          }

          .pointer-flip {
            transform: translateY(-10%) rotate(-180deg);
          }
        }

        &.is-active {
          background: $brand-color;
          border: 2px solid $brand-color;
          color: $white-50;
        }

        &.disabled {
          filter: brightness(85%) opacity(40%);
        }
      }
    }
  }
}

.pagination-margin {
  height: $single-item-height;
  width: 100%;

  @media (max-width: $mobile-breakpoint) {
    height: 58px;
  }
}
</style>

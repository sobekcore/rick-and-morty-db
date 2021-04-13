import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/intro.vue";

describe("Intro.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

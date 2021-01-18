import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { last } from "lodash";
import Vuex from "vuex";
import Recipe from "@/components/Recipe";
import wait from "../../src/helpers/wait";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.filter("date", () => "I am formatted date");

let currentRecipe = {
  id: "2WEKaVNO",
  parent: "root",
  description: "description",
  versions: ["version1", "version2", "version3"],
  createdAt: 1610702654321
};

describe("RecipeTree component", () => {
  let mutations, getters, store, wp;

  beforeEach(() => {
    getters = {
      currentRecipe: () => currentRecipe
    };
    mutations = {
      updateRecipeWithDescription: jest.fn(({ description }) => {
        currentRecipe.versions.push(description);
      })
    };
    store = new Vuex.Store({
      getters,
      mutations
    });

    wp = shallowMount(Recipe, { store, localVue });
  });

  it("should render as expected", () => {
    expect(wp).toMatchSnapshot();
  });

  it("should correctly format date by filter", () => {
    expect(wp.html()).toContain("Created at: <time>I am formatted date</time>");
  });

  // it("should correctly update recipe", async () => {
  // const wrapper = mount(Recipe, { store, localVue });
  // const versionsAmount = currentRecipe.versions.length;
  // expect(wrapper.findAll("ul > li").length).toEqual(versionsAmount);
  // const input = wrapper.find(".description-input");
  // input.setValue("new description");
  // input.setValue("newer description");
  // await wait(3100);
  // expect(mutations.updateRecipeWithDescription).toHaveBeenCalledTimes(1);
  // expect(last(currentRecipe.versions)).toEqual("newer description");
  // expect(currentRecipe.versions.length).toEqual(versionsAmount + 1);
  // });
});

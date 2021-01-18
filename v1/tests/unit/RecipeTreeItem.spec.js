import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import RecipeTreeItem from "@/components/RecipeTreeItem";

const localVue = createLocalVue();
localVue.use(Vuex);

const currentRecipe = {
  id: "2WEKaVNO",
  parent: "root",
  description: "Fried potato",
  versions: ["Potato", "Pomamo", "Posestro"],
  createdAt: 1610702654321,
  children: []
};

let activeRecipeId = "not current recipe id";

describe("RecipeTree component", () => {
  let mutations, actions, getters, store;

  beforeEach(() => {
    // clear current recipe children
    currentRecipe.children = [];

    getters = {
      rootRecipeId: () => "root",
      getRecipeById: () => () => currentRecipe,
      isRecipeActive: () => () => currentRecipe.id === activeRecipeId
    };
    actions = {
      addNewRecipe: jest.fn()
    };
    mutations = {
      setActiveRecipeById: jest.fn(() => {
        activeRecipeId = currentRecipe.id;
      }),
      makeRecipeParent: jest.fn(() => {
        currentRecipe.children.push("childId");
      })
    };
    store = new Vuex.Store({
      actions,
      getters,
      mutations
    });
  });

  it("should render as expected", () => {
    const wp = shallowMount(RecipeTreeItem, { store, localVue });
    expect(wp).toMatchSnapshot();
  });

  it("should make this TreeItem active", async () => {
    const wp = shallowMount(RecipeTreeItem, { store, localVue });
    wp.find(".show-icon").trigger("click");
    expect(mutations.setActiveRecipeById).toHaveBeenCalled();
  });

  it("should add recipe on '+' item click", async () => {
    store.commit("makeRecipeParent");
    const wp = shallowMount(RecipeTreeItem, {
      store,
      localVue,
      propsData: () => ({ isOpen: true })
    });
    wp.find(".add-item").trigger("click");
    expect(actions.addNewRecipe).toHaveBeenCalled();
  });

  it("correctly toggles on click", async () => {
    store.commit("makeRecipeParent");
    const methods = { toggle: jest.fn() };
    const wp = shallowMount(RecipeTreeItem, { store, localVue, methods });

    expect(wp.find(".children").isVisible()).toBeFalsy();
    wp.find(".item").trigger("click");
    expect(methods.toggle).toHaveBeenCalled();
  });

  it("should create children branch on double click", () => {
    const wp = shallowMount(RecipeTreeItem, { store, localVue });
    wp.find(".item").trigger("dblclick");
    expect(mutations.makeRecipeParent).toHaveBeenCalled();
    expect(actions.addNewRecipe).toHaveBeenCalled();
  });
});

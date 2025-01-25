export enum LeftContainer {
  Explorer,
  Structure
}

export enum MainContainer {
  Source,
  ExecutionLogging,
}

export enum BottomContainer {
  Logging,
  Testing
}

export class LayoutState {

  public leftContainer: LeftContainer;
  public mainContainer: MainContainer;
  public bottomContainer: BottomContainer;

  public constructor(leftContainer: LeftContainer,
                     mainContainer: MainContainer,
                     bottomContainer: BottomContainer) {
    this.leftContainer = leftContainer;
    this.mainContainer = mainContainer;
    this.bottomContainer = bottomContainer;
  }

  public static defaultState(): LayoutState {
    return new LayoutState(LeftContainer.Explorer, MainContainer.Source, BottomContainer.Logging);
  }

  public setLeftContainer(value: LeftContainer): LayoutState {
    return new LayoutState(value, this.mainContainer, this.bottomContainer);
  }

  public setMainContainer(value: MainContainer): LayoutState {
    return new LayoutState(this.leftContainer, value, this.bottomContainer);
  }

  public setBottomContainer(value: BottomContainer): LayoutState {
    return new LayoutState(this.leftContainer, this.mainContainer, value);
  }
}
<div class="container">
    <div class="alert alert-warning text-center" ng-show="errorMessage">
        <h4>{# errorMessage #}</h4>

    </div>
    <form action="{{ route('submit') }}" method="POST" name="form_lucky" ng-submit="form_lucky.$valid && lottery($event)" class="col-sm-8 col-sm-offset-2">
        <input type="hidden" name="_token" value="{{ csrf_token() }}" />

        <div class="col-xs-4">
            <input type="number" value="0" class="form-control" name="a" ng-model="lucky.a" />
        </div>

        <div class="col-xs-4">
            <input type="number" value="0" class="form-control" name="b" ng-model="lucky.b" />
        </div>

        <div class="col-xs-4">
            <input type="number" value="0" class="form-control" name="c" ng-model="lucky.c" />
        </div>

        <div class="clear"></div>
        <br /><br /><br /><br />

        <button type="submit" class="center-block button btn btn-lg btn-primary">{# button #}</button>

    </form>
</div>
